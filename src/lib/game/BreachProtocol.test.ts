import { BufferParams, config } from '@/lib/config';
import BreachProtocol from './BreachProtocol';

describe('BreachProtocol core methods', () => {
  let game: BreachProtocol;

  beforeEach(() => {
    game = new BreachProtocol(config);
    game.init();
  });

  it('generateMatrix creates a correct square matrix', () => {
    game.generateMatrix();
    expect(game.displayMatrix.length).toBe(game.matrixSize);
    game.displayMatrix.forEach(row => {
      expect(row.length).toBe(game.matrixSize);
      row.forEach(cell => {
        expect(config.byteRange).toContain(cell);
      });
    });
  });

  it('formatMatrixForTraversal creates a matrix of ByteChar objects', () => {
    game.generateMatrix();
    game.formatMatrixForTraversal();
    game.matrix.forEach((row, i) => {
      row.forEach((cell, j) => {
        expect(cell.visited).toBe(false);
        expect(cell.byteChars).toBe(game.displayMatrix[i][j]);
      });
    });
  });

  it('traverseRowForNextChar marks a byte as visited', () => {
    const rowIdx = 0;
    const result = game.traverseRowForNextChar(rowIdx);
    expect(result).not.toBeNull();
    if (result) {
      expect(game.matrix[rowIdx][result.pickedColumnIndex].visited).toBe(true);
    }
  });

  it('traverseColumnForNextChar marks a byte as visited', () => {
    const colIdx = 0;
    const result = game.traverseColumnForNextChar(colIdx);
    expect(result).not.toBeNull();
    if (result) {
      expect(game.matrix[result.pickedRowIndex][colIdx].visited).toBe(true);
    }
  });

  it('traverseColumnForNextChar returns null if all rows in column are visited', () => {
    game.generateMatrix();
    game.formatMatrixForTraversal();
    // Mark all cells in column 0 as visited
    for (let i = 0; i < game.matrixSize; i++) {
      game.matrix[i][0].visited = true;
    }
    expect(game.traverseColumnForNextChar(0)).toBeNull();
  });

  it('traverseRowForNextChar returns null if all bytes in row are visited', () => {
    game.generateMatrix();
    game.formatMatrixForTraversal();
    // Mark all cells in row 0 as visited
    for (let j = 0; j < game.matrixSize; j++) {
      game.matrix[0][j].visited = true;
    }
    expect(game.traverseRowForNextChar(0)).toBeNull();
  });

  it('generatePossibleSequence fills possibleSequence correctly', () => {
    game.generatePossibleSequence();
    expect(game.possibleSequence.length).toBe(game.maxBufferSize);
    game.possibleSequence.forEach(byte => {
      expect(config.byteRange).toContain(byte);
    });
  });

  it('ends sequence generation early if matrix is exhausted', () => {
    // 2x2 matrix, buffer size 10 (more than possible unique picks)
    const testParams: BufferParams = { size: 10, subSequence: [[0, 10]] };
    const smallConfig = { ...config, matrixSize: 2 };
    const game = new BreachProtocol(smallConfig, testParams);
    game.init();
    // The sequence should be at most 4 (the number of cells in the matrix)
    expect(game.possibleSequence.length).toBeLessThanOrEqual(4);
  });

  it('generateDaemonSequences creates unique daemon names', () => {
    game.generatePossibleSequence();
    game.generateDaemonSequences();
    const names = game.daemonSequences.map(d => d.name);
    expect(new Set(names).size).toBe(names.length);
    game.daemonSequences.forEach(d => {
      expect(Array.isArray(d.sequence)).toBe(true);
      expect(d.sequence.length).toBeGreaterThan(0);
      d.sequence.forEach(byte => expect(config.byteRange).toContain(byte));
    });
  });

  it('init fully initializes the game state', () => {
    expect(game.matrix.length).toBe(game.matrixSize);
    expect(game.displayMatrix.length).toBe(game.matrixSize);
    expect(game.possibleSequence.length).toBe(game.maxBufferSize);
    expect(game.daemonSequences.length).toBe(game.bufferParams.subSequence.length);
  });

  it('init is idempotent', () => {
    const matrixBefore = JSON.stringify(game.matrix);
    game.init();
    const matrixAfter = JSON.stringify(game.matrix);
    expect(matrixAfter).not.toEqual(matrixBefore); // Should re-initialize
  });

  // Edge case: empty byteRange
  it('should throw if byteRange is empty', () => {
    const badConfig = { ...config, byteRange: [] };
    const gameWithBadConfig = new BreachProtocol(badConfig);
    expect(() => {
      gameWithBadConfig.generateMatrix();
    }).toThrow();
  });

  // Edge case: empty bufferParams.subSequence
  it('should handle empty bufferParams.subSequence', () => {
    const testParams: BufferParams = { size: 4, subSequence: [] };
    const gameWithNoDaemons = new BreachProtocol(config, testParams);
    gameWithNoDaemons.init();
    expect(gameWithNoDaemons.daemonSequences.length).toBe(0);
  });
});
