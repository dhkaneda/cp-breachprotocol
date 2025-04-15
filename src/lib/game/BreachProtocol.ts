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

  traverseColumnForNextChar(pickedColumnIndex: number) : {pickedRowIndex: number, byteChars: string} {
    // selects random byte from unvisited rows in selected column
    const unvisitedRows = this.matrix.filter(
      (row) => !row[pickedColumnIndex].visited
    );
    const randomRow =
      unvisitedRows[Math.floor(Math.random() * unvisitedRows.length)];
    const randomByte = randomRow[pickedColumnIndex];
    randomByte.visited = true;

    return {
      pickedRowIndex: this.matrix.indexOf(randomRow),
      byteChars: randomByte.byteChars,
    };
  }

  traverseRowForNextChar(pickedRowIndex : number = 0) : {pickedColumnIndex: number, byteChars: string} {
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
      const getNextChar = checkRow
        ? this.traverseRowForNextChar.bind(this)
        : this.traverseColumnForNextChar.bind(this);
      const chosenByte = getNextChar(pickedIndex);
      this.possibleSequence.push(chosenByte.byteChars);
      traversalCount += 1;
      if (traversalCount < this.maxBufferSize) {
        const nextIndex = checkRow
          ? chosenByte.pickedColumnIndex
          : chosenByte.pickedRowIndex;
        traverse(nextIndex, !checkRow);
      }
    };

    traverse(0, true);
  }

  generateDaemonSequences() {
    // Generate daemon sequences
    this.daemonSequences = this.bufferParams.subSequence.map(
      ([startingIndex, sequenceLength]) => {
        const [removedRandomDaemon] = this.possibleDaemons.splice(selectRandomFrom([...Array(this.possibleDaemons.length).keys()]), 1);

        const sequence = this.possibleSequence.slice(
          startingIndex,
          startingIndex + sequenceLength
        );

        return {
          name: removedRandomDaemon,
          sequence,
        };
      }
    );

    shuffleArray(this.daemonSequences);
  }
}
