import { BreachProtocol } from './lib/game/BreachProtocol.js';
import { selectRandomFrom } from './lib/utils.js';
import { config } from './config.js';

const { matrixSize, byteRange } = config;
const bufferParams = selectRandomFrom(config.bufferKey[selectRandomFrom(Object.keys(config.bufferKey))]);

const matrix = new BreachProtocol(matrixSize, byteRange, bufferParams);

matrix.init();

console.dir(matrix, { depth: null });