import { selectRandomFrom } from "../utils.js";
import { config } from "../../config.js";
export class BreachProtocol {
  constructor(matrixSize = 5, byteRange, bufferParams) {
    this.bufferParams = bufferParams;
    this.byteRange = byteRange;
    this.maxBufferSize = this.bufferParams.size;
    this.matrixSize = matrixSize;
    this.matrix = [];
    this.displayMatrix = [];
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
    // for display purposes, chars only
    this.matrix = new Array(this.matrixSize).fill();
    this.matrix = this.matrix.map(() =>
      new Array(this.matrixSize)
        .fill(0)
        .map((zero) => selectRandomFrom(this.byteRange))
    );
    this.displayMatrix = this.matrix;
  }

  formatMatrixForTraversal() {
    // for game solution generation
    this.matrix = this.matrix.map((byteRow) => {
      return byteRow.map((byteChars) => {
        return {
          visited: false,
          byteChars,
        };
      });
    });
  }

  traverseColumnForNextChar(pickedColumnIndex) {
    // selects random byte from selected column
    const rowsLeft = Array.from(Array(this.matrixSize).keys());
    this.matrix.forEach((row, index) => {
      if (row[pickedColumnIndex].visited)
        rowsLeft.splice(rowsLeft.indexOf(index), 1);
    });

    const randomRowIndex = selectRandomFrom(rowsLeft);
    const randomByte = this.matrix[randomRowIndex][pickedColumnIndex];
    randomByte.visited = true;

    return {
      pickedRowIndex: randomRowIndex,
      byteChars: randomByte.byteChars,
    };
  }

  traverseRowForNextChar(pickedRowIndex = 0) {
    // selects random byte from selected row
    const columnsLeft = Array.from(Array(this.matrixSize).keys());
    this.matrix[pickedRowIndex].forEach((byte, index) => {
      if (byte.visited) columnsLeft.splice(columnsLeft.indexOf(index), 1);
    });

    const randomColumnIndex = selectRandomFrom(columnsLeft);
    const randomByte = this.matrix[pickedRowIndex][randomColumnIndex];
    randomByte.visited = true;

    return {
      pickedColumnIndex: randomColumnIndex,
      byteChars: randomByte.byteChars,
    };
  }

  generatePossibleSequence() {
    let traversalCount = 0;

    const traverseMatrix = (pickedIndex, checkRow) => {
      if (checkRow) {
        const chosenByte = this.traverseRowForNextChar(pickedIndex);
        this.possibleSequence.push(chosenByte.byteChars);
        traversalCount += 1;
        if (traversalCount < this.maxBufferSize) {
          traverseMatrix(chosenByte.pickedColumnIndex, false);
        }
      } else {
        const chosenByte = this.traverseColumnForNextChar(pickedIndex);
        this.possibleSequence.push(chosenByte.byteChars);
        traversalCount += 1;
        if (traversalCount < this.maxBufferSize) {
          traverseMatrix(chosenByte.pickedRowIndex, true);
        }
      }
    };

    traverseMatrix(0, true);
  }

  generateDaemonSequences() {
    this.daemonSequences = this.bufferParams.subSequence.map((tuple) => {
      const [startingIndex, sequenceLength] = tuple;

      const randomIndex = Math.floor(
        Math.random() * config.possibleDaemons.length
      );
      const removedRandomDaemon = config.possibleDaemons.splice(
        randomIndex,
        1
      )[0];

      return {
        name: removedRandomDaemon,
        sequence: this.possibleSequence.slice(
          startingIndex,
          startingIndex + sequenceLength
        ),
      };
    });

    // assuming this.daemonSequences is an array
    this.daemonSequences = this.daemonSequences.sort(() => Math.random() - 0.5);
  }
}
