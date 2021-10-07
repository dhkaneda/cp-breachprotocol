class BreachProtocol {
  constructor(maxBufferSize = 8, matrixSize = 5) {
    this.byteRange = ['BD', 'E9', '55', '1C', '7A'];
    this.maxBufferSize = maxBufferSize;
    this.matrixSize = matrixSize;
    this.matrix = [];
    this.traversalMatrix = [];
    this.possibleSequence = [];
  }

  init() {
    this.generateMatrix();
    this.formatMatrixForTraversal();
    this.generatePossibleSequence();
  }

  selectRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  generateMatrix() {
    // for display purposes, chars only
    this.matrix = new Array(this.matrixSize).fill();
    this.matrix = this.matrix.map(() => new Array(this.matrixSize).fill(0).map((zero) => this.selectRandomFrom(this.byteRange)));
  }

  formatMatrixForTraversal() {
    // for game solution generation
    this.traversalMatrix = this.matrix.map((byteRow) => {
      return byteRow.map((byteChars) => {
        return {
          visited: false,
          byteChars,
        }
      })
    });
  }

  traverseColumnForNextChar(traversalMatrix, pickedColumnIndex) {
    // selects random byte from selected column
    const rowsLeft = Array.from(Array(this.matrixSize).keys());
    traversalMatrix.forEach((row, index) => {
        if (row[pickedColumnIndex].visited) {
            rowsLeft.splice(rowsLeft.indexOf(index), 1);
        }
    })

    const randomRowIndex = this.selectRandomFrom(rowsLeft);
    const theChosenByte = traversalMatrix[randomRowIndex][pickedColumnIndex]
    theChosenByte.visited = true;

    return {
      pickedRowIndex: randomRowIndex,
      byteChars: theChosenByte.byteChars,
    };
  }

  traverseRowForNextChar(traversalMatrix, pickedRowIndex = 0) {
    // selects random byte from selected row
    const columnsLeft = Array.from(Array(this.matrixSize).keys());
    traversalMatrix[pickedRowIndex].forEach((byte, index) => {
        if (byte.visited) {
            columnsLeft.splice(columnsLeft.indexOf(index), 1)
        }
    })

    const randomColumnIndex = this.selectRandomFrom(columnsLeft);
    const theChosenByte = traversalMatrix[pickedRowIndex][randomColumnIndex];
    theChosenByte.visited = true;

    return {
      pickedColumnIndex: randomColumnIndex,
      byteChars: theChosenByte.byteChars,
    }
  }

  generatePossibleSequence() {
    // traverse matrix rows and columns, finding a possible solution
    if (this.matrix.length === 0) {
      return 0;
    } else {
      const possibleSequence = [];
      let traversalCount = 0;

      const traverse = (traversalMatrix, pickedIndex, checkRow) => {
        if (checkRow) {
          const chosenByte = this.traverseRowForNextChar(traversalMatrix, pickedIndex);
          possibleSequence.push(chosenByte.byteChars);
          traversalCount += 1;
          if (traversalCount < this.maxBufferSize) {
            traverse(traversalMatrix, chosenByte.pickedColumnIndex, false);
          }
        } else { //checkColumn
          const chosenByte = this.traverseColumnForNextChar(traversalMatrix, pickedIndex);
          possibleSequence.push(chosenByte.byteChars);
          traversalCount += 1;
          if (traversalCount < this.maxBufferSize) {
            traverse(traversalMatrix, chosenByte.pickedRowIndex, true);
          }
        }
      }

      traverse(this.traversalMatrix, 0, true);
      this.possibleSequence = possibleSequence;
    }
  } 
}

const matrix = new BreachProtocol();

matrix.init();

console.log(matrix);

// export default Matrix;