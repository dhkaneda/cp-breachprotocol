import { BreachProtocol } from './game/BreachProtocol.js';
import { selectRandomFrom } from './utils.js';
import { config } from './config.js';

const { matrixSize, byteRange } = config;

const bufferKeys = Object.keys(config.bufferKey);
const randomBufferKeyIndex = selectRandomFrom(bufferKeys);
const bufferParams = selectRandomFrom(config.bufferKey[randomBufferKeyIndex]);
const possibleDaemons = config.possibleDaemons;

const matrix = new BreachProtocol(matrixSize, byteRange, bufferParams, possibleDaemons);

matrix.init();

console.dir(matrix, { depth: null });