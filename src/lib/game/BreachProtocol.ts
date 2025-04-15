import { selectRandomFrom, shuffleArray } from '@/lib/utils';

interface ByteChar {
  visited: boolean;
  byteChars: string;
}

interface BufferParams {
  size: number;
  subSequence: [number, number][];
}

interface DaemonSequence {
  name: string;
  sequence: string[];
}

export default class BreachProtocol {
  bufferParams: BufferParams;
  byteRange: string[];
  maxBufferSize: number;
  matrixSize: number;
  matrix: ByteChar[][];
  displayMatrix: string[][];
  possibleDaemons: string[];
  possibleSequence: string[];
  daemonSequences: DaemonSequence[];

  constructor(
    config: {
      matrixSize: number;
      byteRange: string[];
      bufferKey: Record<number, BufferParams[]>;
      possibleDaemons: string[];
    },
    bufferParams?: BufferParams
  ) {
    const { matrixSize, byteRange, bufferKey, possibleDaemons } = config;
    let chosenBufferParams = bufferParams;
    if (!chosenBufferParams) {
      const bufferKeyKeys = Object.keys(bufferKey).map(Number); // ensure keys are numbers
      const randomKey = selectRandomFrom(bufferKeyKeys);
      const bufferParamsArray = bufferKey[randomKey];
      if (!bufferParamsArray || bufferParamsArray.length === 0) {
        throw new Error('No bufferParams available for the selected key');
      }
      chosenBufferParams = selectRandomFrom(bufferParamsArray);
    }
    this.bufferParams = chosenBufferParams!;
    this.byteRange = byteRange;
    this.maxBufferSize = chosenBufferParams!.size;
    this.matrixSize = matrixSize;
    this.matrix = [];
    this.displayMatrix = [];
    this.possibleDaemons = possibleDaemons;
    this.possibleSequence = [];
    this.daemonSequences = [];
  }

  init() {
    this.generateMatrix();
    this.formatMatrixForTraversal();
    this.generatePossibleSequence();
    this.generateDaemonSequences();
  }

  generateMatrix() {
    if (!this.byteRange || this.byteRange.length === 0) {
      throw new Error('byteRange cannot be empty');
    }
    this.displayMatrix = Array.from({ length: this.matrixSize }, () => {
      return Array.from({ length: this.matrixSize }, () =>
        selectRandomFrom(this.byteRange)
      );
    });
  }

  formatMatrixForTraversal() {
    this.matrix = this.displayMatrix.map((byteRow) =>
      byteRow.map((byte) => ({
        visited: false,
        byteChars: byte,
      }))
    );
  }

  traverseColumnForNextChar(pickedColumnIndex: number): { pickedRowIndex: number, byteChars: string } | null {
    // selects random byte from unvisited rows in selected column
    const unvisitedRows = this.matrix.filter(
      (row) => !row[pickedColumnIndex].visited
    );
    const randomRow = selectRandomFrom(unvisitedRows);
    const randomByte = randomRow[pickedColumnIndex];
    randomByte.visited = true;

    return {
      pickedRowIndex: this.matrix.indexOf(randomRow),
      byteChars: randomByte.byteChars,
    };
  }

  traverseRowForNextChar(pickedRowIndex: number = 0): { pickedColumnIndex: number, byteChars: string } | null {
    const unvisitedBytes = this.matrix[pickedRowIndex].filter(
      (byte) => !byte.visited
    );
    const randomByte = selectRandomFrom(unvisitedBytes);
    randomByte.visited = true;

    return {
      pickedColumnIndex: this.matrix[pickedRowIndex].indexOf(randomByte),
      byteChars: randomByte.byteChars,
    };
  }

  generatePossibleSequence() {
    let traversalCount = 0;

    const traverse = (pickedIndex: number, checkRow: boolean) => {
      if (this.possibleSequence.length >= this.maxBufferSize) {
        return;
      }
      const getNextChar = checkRow
        ? this.traverseRowForNextChar.bind(this)
        : this.traverseColumnForNextChar.bind(this);
      const chosenByte = getNextChar(pickedIndex);
      if (!chosenByte) {
        // No more unvisited bytes/rows; end sequence early
        return;
      }
      this.possibleSequence.push(chosenByte.byteChars);
      traversalCount += 1;
      if (this.possibleSequence.length >= this.maxBufferSize) {
        return;
      }
      if (traversalCount < this.maxBufferSize) {
        const nextIndex = checkRow
          ? (chosenByte as { pickedColumnIndex: number }).pickedColumnIndex
          : (chosenByte as { pickedRowIndex: number }).pickedRowIndex;
        traverse(nextIndex, !checkRow);
      }
    };

    traverse(0, true);
  }

  generateDaemonSequences() {
    // Generate daemon sequences
    const usedNames = new Set<string>();
    this.daemonSequences = [];
    for (const [startingIndex, sequenceLength] of this.bufferParams.subSequence) {
      // Only generate if the slice is valid and non-empty
      if (
        startingIndex >= 0 &&
        startingIndex < this.possibleSequence.length &&
        sequenceLength > 0 &&
        startingIndex + sequenceLength <= this.possibleSequence.length
      ) {
        // Pick a random, unused daemon name
        let availableNames = this.possibleDaemons.filter((d) => !usedNames.has(d));
        if (availableNames.length === 0) break;
        const removedRandomDaemon = selectRandomFrom(availableNames);
        usedNames.add(removedRandomDaemon);
        const sequence = this.possibleSequence.slice(
          startingIndex,
          startingIndex + sequenceLength
        );
        if (sequence.length > 0) {
          this.daemonSequences.push({
            name: removedRandomDaemon,
            sequence,
          });
        }
      }
    }
    shuffleArray(this.daemonSequences);
  }
}
