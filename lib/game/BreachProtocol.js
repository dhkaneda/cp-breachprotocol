class BreachProtocol {
  constructor(bufferSize = 6, matrixSize = 5) {
    this.byteRange = ['BD', 'E9', '55', '1C', '7A'];
    this.bufferSize = bufferSize;
    this.matrixSize = matrixSize;
    this.matrix = [];
    this.traversalMatrix = [];
    this.possibleSequence = [];
  }

  selectRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  init() {
    this.generateMatrix();
    this.generatePossibleSequence();
    this.formatMatrixForTraversal();
  }

  generateRandomByte() {
    return this.selectRandomFrom(this.byteRange);
  }

  generateMatrix() {
    this.matrix = new Array(this.matrixSize).fill();
    this.matrix = this.matrix.map(() => new Array(this.matrixSize).fill(0).map((zero) => this.generateRandomByte()));
  }

  formatMatrixForTraversal() {
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
    const rowsLeft = Array.from(Array(this.matrixSize).keys());
    rowsLeft.splice(rowsLeft.indexOf(pickedColumnIndex), 1);

    const nextRandomRowIndex = this.selectRandomFrom(rowsLeft);
    const theChosenByte = traversalMatrix[nextRandomRowIndex][pickedColumnIndex]
    theChosenByte.visited = true;
    return {
      nextRandomRowIndex,
      byteChars: theChosenByte.byteChars,
    };
  }

  traverseRowForNextChar(traversalMatrix, pickedRowIndex) {
    const columnsLeft = Array.from(Array(this.matrixSize).keys());
    columnsLeft.splice(columnsLeft.indexOf(pickedRowIndex), 1);


    const nextRandomColumnIndex = this.selectRandomFrom(columnsLeft);
    const theChosenByte = traversalMatrix[pickedRowIndex][nextRandomColumnIndex];
    theChosenByte.visited = true;
    return {
      nextRandomColumnIndex,
      byteChars: theChosenByte.byteChars,
    }
  }

  generatePossibleSequence() {
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
          if (traversalCount < this.bufferSize) {
            traverse(traversalMatrix, chosenByte.nextRandomColumnIndex, false);
          }
        } else { //checkColumn
          const chosenByte = this.traverseColumnForNextChar(traversalMatrix, pickedIndex);
          possibleSequence.push(chosenByte.byteChars);
          traversalCount += 1;
          if (traversalCount < this.bufferSize) {
            traverse(traversalMatrix, chosenByte.nextRandomRowIndex, true);
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