import { BreachProtocol } from './lib/game/BreachProtocol.js';

const matrix = new BreachProtocol();

matrix.init();

console.log(JSON.stringify(matrix, null, 2));