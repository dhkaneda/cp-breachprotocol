import { BreachProtocol } from './lib/game/BreachProtocol.js';
import { config } from './config.js';

const { maxBufferSize, matrixSize, byteRange } = config;

const matrix = new BreachProtocol(maxBufferSize, matrixSize, byteRange);

matrix.init();

console.log(JSON.stringify(matrix, null, 2));