import { selectRandomFrom, shuffleArray } from "../utils.js";
export class BreachProtocol {
  constructor(matrixSize = 5, byteRange, bufferParams, possibleDaemons) {
    this.bufferParams = bufferParams;
    this.byteRange = byteRange;
    this.maxBufferSize = this.bufferParams.size;
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
    this.matrix = Array.from({ length: this.matrixSize }, () => {
      return Array.from({ length: this.matrixSize }, () =>
        selectRandomFrom(this.byteRange)
      );
    });
    this.displayMatrix = this.matrix;
  }

  formatMatrixForTraversal() {
    this.matrix = this.matrix.map((byteRow) =>
      byteRow.map((byteChars) => ({ visited: false, byteChars }))
    );
  }

  traverseColumnForNextChar(pickedColumnIndex) {
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

  traverseRowForNextChar(pickedRowIndex = 0) {
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

    const traverse = (pickedIndex, checkRow) => {
      const getNextChar = checkRow
        ? this.traverseRowForNextChar
        : this.traverseColumnForNextChar;
      const chosenByte = getNextChar.call(this, pickedIndex);
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
