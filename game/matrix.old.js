class Matrix {
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.sequence = [];
    this.ROW_AMOUNT = 5;
    this.COLUMN_AMOUNT = 5;
    this.possibleBytes = [
      'BD',
      'E9',
      '55',
      '1C',
      '7A',
    ]
  }

  init() {
    for (let i = 0; i < this.ROW_AMOUNT; i += 1){
      const row = [];
      for (let i = 0; i < this.COLUMN_AMOUNT; i += 1) {
        row.push(this.possibleBytes[Math.floor(Math.random() * this.possibleBytes.length)])
      }
      this.sequence.push(row);
    }
  }

  getSequence() {
    this.init();
    return this.sequence;
  }

  traverseMatrix_Column_ToFindNextChar(matrixWithFlags, pickedColumnIndex) {
    // to create array of indices to pick from excluding previously picked index
    const rowsLeft = [];
    for (let i = 0; i < this.ROW_AMOUNT; i += 1){
      if (!matrixWithFlags[i][pickedColumnIndex].visited) {
        rowsLeft.push(i); 
      }
    }
    // pick a byte char from a random row
    const nextRandomRowIndex = rowsLeft[Math.floor(Math.random() * rowsLeft.length)];
    const theChosenByte = matrixWithFlags[nextRandomRowIndex][pickedColumnIndex]
    theChosenByte.visited = true;
    return {
      pickedRowIndex: nextRandomRowIndex,
      byteChars: theChosenByte.byteChars,
    };
  }

  traverseMatrix_Row_ToFindNextChar(matrixWithFlags, pickedRowIndex) {
    // to create array of indices to pick from excluding previously picked index
    const columnsLeft = [];
    for (let i = 0; i < this.COLUMN_AMOUNT; i += 1) {
      if (!matrixWithFlags[pickedRowIndex][i].visited) {
        columnsLeft.push(i); 
      }
    }
    // pick a byte char from a random row
    const nextRandomColumnIndex = columnsLeft[Math.floor(Math.random() * columnsLeft.length)];
    const theChosenByte = matrixWithFlags[pickedRowIndex][nextRandomColumnIndex];
    theChosenByte.visited = true;
    return {
      pickedColumnIndex: nextRandomColumnIndex,
      byteChars: theChosenByte.byteChars,
    }
  }

  formatMatrixForTraversal() {
    return this.sequence.map((byteRow) => {
      return byteRow.map((byteChars) => {
        return {
          visited: false,
          byteChars,
        }
      })
    });
  }

  getPossibleBuffer() {
    if (this.sequence.length === 0) {
      return 0;
    } else {
      const possibleBuffer = [];
      const reformattedMatrix = this.formatMatrixForTraversal();
      let timesTraversed = 0;

      const traverseAxis = (reformattedMatrix, pickedIndex, checkRowOrNot) => {
        if (checkRowOrNot) {
          const chosenByte = this.traverseMatrix_Row_ToFindNextChar(reformattedMatrix, pickedIndex);
          possibleBuffer.push(chosenByte.byteChars);
          timesTraversed += 1;
          if (timesTraversed < this.bufferSize) {
            traverseAxis(reformattedMatrix, chosenByte.pickedColumnIndex, false);
          }
        } else {
          const chosenByte = this.traverseMatrix_Column_ToFindNextChar(reformattedMatrix, pickedIndex);
          possibleBuffer.push(chosenByte.byteChars);
          timesTraversed += 1;
          if (timesTraversed < this.bufferSize) {
            traverseAxis(reformattedMatrix, chosenByte.pickedRowIndex, true);
          }
        }
      }

      traverseAxis(reformattedMatrix, 0, true);
      return possibleBuffer;
    }
  }
}

export default Matrix;