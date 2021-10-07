import { selectRandomFrom } from '../utils.js';

export class BreachProtocol {
  constructor(maxBufferSize = 8, matrixSize = 5) {
    this.byteRange = ['BD', 'E9', '55', '1C', '7A'];
    this.maxBufferSize = maxBufferSize;
    this.matrixSize = matrixSize;
    this.matrix = [];
    this.possibleSequence = [];
  }

  init() {
    this.generateMatrix();
    this.formatMatrixForTraversal();
    this.generatePossibleSequence();
  }
  
  generateMatrix() {
    // for display purposes, chars only
    this.matrix = new Array(this.matrixSize).fill();
    this.matrix = this.matrix.map(() => new Array(this.matrixSize).fill(0).map((zero) => selectRandomFrom(this.byteRange)));
  }

  formatMatrixForTraversal() {
    // for game solution generation
    this.matrix = this.matrix.map((byteRow) => {
      return byteRow.map((byteChars) => {
        return {
          visited: false,
          byteChars,
        }
      })
    });
  }

  traverseColumnForNextChar(pickedColumnIndex) {
    // selects random byte from selected column
    const rowsLeft = Array.from(Array(this.matrixSize).keys());
    this.matrix.forEach((row, index) => {
        if (row[pickedColumnIndex].visited) {
            rowsLeft.splice(rowsLeft.indexOf(index), 1);
        }
    })

    const randomRowIndex = selectRandomFrom(rowsLeft);
    const theChosenByte = this.matrix[randomRowIndex][pickedColumnIndex]
    theChosenByte.visited = true;

    return {
      pickedRowIndex: randomRowIndex,
      byteChars: theChosenByte.byteChars,
    };
  }

  traverseRowForNextChar(pickedRowIndex = 0) {
    // selects random byte from selected row
    const columnsLeft = Array.from(Array(this.matrixSize).keys());
    this.matrix[pickedRowIndex].forEach((byte, index) => {
        if (byte.visited) {
            columnsLeft.splice(columnsLeft.indexOf(index), 1)
        }
    })

    const randomColumnIndex = selectRandomFrom(columnsLeft);
    const theChosenByte = this.matrix[pickedRowIndex][randomColumnIndex];
    theChosenByte.visited = true;

    return {
      pickedColumnIndex: randomColumnIndex,
      byteChars: theChosenByte.byteChars,
    }
  }

  generatePossibleSequence() {
    // traverse matrix rows and columns, finding a possible solution
    let traversalCount = 0;

    const traverse = (pickedIndex, checkRow) => {
      if (checkRow) {
        const chosenByte = this.traverseRowForNextChar(pickedIndex);
        this.possibleSequence.push(chosenByte.byteChars);
        traversalCount += 1;
        if (traversalCount < this.maxBufferSize) {
          traverse(chosenByte.pickedColumnIndex, false);
        }
      } else { //checkColumn
        const chosenByte = this.traverseColumnForNextChar(pickedIndex);
        this.possibleSequence.push(chosenByte.byteChars);
        traversalCount += 1;
        if (traversalCount < this.maxBufferSize) {
          traverse(chosenByte.pickedRowIndex, true);
        }
      }
    }

    traverse(0, true);
  }
}