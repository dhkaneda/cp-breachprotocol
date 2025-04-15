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
    // Find all rows with an unvisited byte in this column
    const unvisitedRows = this.matrix.filter(row => !row[pickedColumnIndex].visited);
    if (unvisitedRows.length === 0) return null;
  
    // Pick a random row from the unvisited ones
    const randomRow = selectRandomFrom(unvisitedRows);
    // Defensive: randomRow should never be undefined here, but check anyway
    if (!randomRow) return null;
  
    // Get the byte in the selected row and column
    const randomByte = randomRow[pickedColumnIndex];
    // Defensive: randomByte should never be undefined, but check anyway
    if (!randomByte) return null;
  
    // Mark as visited and return result
    randomByte.visited = true;
    return {
      pickedRowIndex: this.matrix.indexOf(randomRow),
      byteChars: randomByte.byteChars,
    };
  }

  traverseRowForNextChar(pickedRowIndex: number = 0): { pickedColumnIndex: number, byteChars: string } | null {
    // Find all unvisited bytes in this row
    const unvisitedBytes = this.matrix[pickedRowIndex].filter(byte => !byte.visited);
    if (unvisitedBytes.length === 0) return null;

    // Pick a random unvisited byte
    const randomByte = selectRandomFrom(unvisitedBytes);
    // Defensive: randomByte should never be undefined, but check anyway
    if (!randomByte) return null;

    // Mark as visited and return result
    randomByte.visited = true;
    return {
      pickedColumnIndex: this.matrix[pickedRowIndex].indexOf(randomByte),
      byteChars: randomByte.byteChars,
    };
  }

  generatePossibleSequence() {
    let traversalCount = 0;

    const traverse = (pickedIndex: number, isRow: boolean) => {
      // Stop if we've reached the buffer size or can't continue
      if (this.possibleSequence.length >= this.maxBufferSize) return;

      const getNextChar = isRow
        ? this.traverseRowForNextChar.bind(this)
        : this.traverseColumnForNextChar.bind(this);

      const chosenByte = getNextChar(pickedIndex);
      if (!chosenByte) return; // Matrix exhausted

      this.possibleSequence.push(chosenByte.byteChars);
      traversalCount++;

      // Determine the next index to traverse
      let nextIndex: number;
      if (isRow && 'pickedColumnIndex' in chosenByte) {
        nextIndex = chosenByte.pickedColumnIndex;
      } else if (!isRow && 'pickedRowIndex' in chosenByte) {
        nextIndex = chosenByte.pickedRowIndex;
      } else {
        return; // Defensive: should never happen
      }

      traverse(nextIndex, !isRow);
    };

    traverse(0, true);
  }

  generateDaemonSequences() {
    // Generate daemon sequences from possibleSequence and subSequence config
    const usedNames = new Set<string>();
    this.daemonSequences = [];

    for (const [startingIndex, sequenceLength] of this.bufferParams.subSequence) {
      // Validate slice bounds
      const isValidSlice =
        startingIndex >= 0 &&
        sequenceLength > 0 &&
        startingIndex + sequenceLength <= this.possibleSequence.length;

      if (!isValidSlice) continue;

      // Pick a random, unused daemon name
      const availableNames = this.possibleDaemons.filter(d => !usedNames.has(d));
      if (availableNames.length === 0) break;

      const selectedDaemon = selectRandomFrom(availableNames);
      usedNames.add(selectedDaemon);

      const sequence = this.possibleSequence.slice(
        startingIndex,
        startingIndex + sequenceLength
      );
      if (sequence.length === 0) continue;

      this.daemonSequences.push({
        name: selectedDaemon,
        sequence,
      });
    }

    // Shuffle for randomness
    shuffleArray(this.daemonSequences);
  }
}
