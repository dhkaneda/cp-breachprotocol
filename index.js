import { BreachProtocol } from './lib/game/BreachProtocol.js';
import { selectRandomFrom } from './lib/utils.js';
import { config } from './config.js';

const { matrixSize, byteRange } = config;

const bufferKeys = Object.keys(config.bufferKey);
const randomBufferKeyIndex = selectRandomFrom(bufferKeys);
const bufferParams = selectRandomFrom(config.bufferKey[randomBufferKeyIndex]);


const matrix = new BreachProtocol(matrixSize, byteRange, bufferParams);

matrix.init();

console.dir(matrix, { depth: null });