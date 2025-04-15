import { config } from '@/lib/config';
import BreachProtocol from '@/lib/game/BreachProtocol';

const matrix = new BreachProtocol(config);
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
