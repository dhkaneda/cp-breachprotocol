import { config, BufferParams } from '@/lib/config';
import BreachProtocol from './BreachProtocol';

describe('BreachProtocol', () => {
  it('should initialize with valid bufferParams from config', () => {
    const game = new BreachProtocol(config);
    expect(game.bufferParams).toBeDefined();
    expect(typeof game.bufferParams.size).toBe('number');
    expect(Array.isArray(game.bufferParams.subSequence)).toBe(true);
  });

  it('should use provided bufferParams if given', () => {
    const testParams: BufferParams = { size: 6, subSequence: [[0, 2], [2, 2], [4, 2]] };
    const game = new BreachProtocol(config, testParams);
    expect(game.bufferParams).toEqual(testParams);
  });

  it('should generate a matrix of the correct size after init()', () => {
    const game = new BreachProtocol(config);
    game.init();
    expect(game.matrix.length).toBe(game.matrixSize);
    game.matrix.forEach(row => {
      expect(row.length).toBe(game.matrixSize);
      row.forEach(cell => {
        expect(typeof cell.byteChars).toBe('string');
        expect(typeof cell.visited).toBe('boolean');
      });
    });
  });

  it('should generate daemon sequences and possible sequence after init()', () => {
    const game = new BreachProtocol(config);
    game.init();
    expect(Array.isArray(game.daemonSequences)).toBe(true);
    expect(Array.isArray(game.possibleSequence)).toBe(true);
  });
});
