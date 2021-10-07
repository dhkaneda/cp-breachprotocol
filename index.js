import { BreachProtocol } from './lib/game/BreachProtocol.js';
import { config } from './config.js';

const { matrixSize, byteRange } = config;

const matrix = new BreachProtocol(matrixSize, byteRange);

matrix.init();

console.dir(matrix, { depth: null });