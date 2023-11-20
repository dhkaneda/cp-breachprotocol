import BreachProtocol from '@/lib/game/BreachProtocol';
import { selectRandomFrom } from '@/lib/utils';
import { config } from '@/lib/config';

const { matrixSize, byteRange, bufferKey } = config;

const bufferKeys = Object.keys(bufferKey);
const randomBufferKeyIndex = selectRandomFrom(bufferKeys);
const bufferParams = selectRandomFrom(bufferKey[randomBufferKeyIndex]);
const possibleDaemons = config.possibleDaemons;

const matrix = new BreachProtocol(matrixSize, byteRange, bufferParams, possibleDaemons);

matrix.init();

console.dir(matrix, { depth: null });

export default function Home() {
  return (
    <main>
      <div>
        <ul>
          {matrix.daemonSequences.map((daemon, i) => (
            <li key={i}>{daemon.name} {daemon.sequence.join(', ')}</li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col'>
        {matrix.displayMatrix.map((row, i) => (
          <div key={i} className='flex gap-2'>
            {row.map((cell, j) => (
              <button key={j}>{cell}</button>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
