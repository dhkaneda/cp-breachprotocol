class Matrix {
  constructor() {
    this.sequence = [];
    this.ROWS = 5;
    this.COLUMNS = 5;
    this.possibleBytes = [
      'BD',
      'E9',
      '55',
      '1C',
      // '7A',
    ]
  }

  init() {
    for (let i = 0; i < this.ROWS; i += 1){
      const row = [];
      for (let i = 0; i < this.COLUMNS; i += 1) {
        row.push(this.possibleBytes[Math.floor(Math.random() * this.possibleBytes.length)])
      }
      this.sequence.push(row);
    }
  }

  getSequence() {
    this.init();
    return this.sequence;
  }
}

export default Matrix;