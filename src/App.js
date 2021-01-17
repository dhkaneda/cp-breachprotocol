import { useEffect, useState } from 'react';
import './App.css';

import Header from './components/header/header';
import Timer from './components/timer/timer';
import Buffer from './components/buffer/buffer';
import Matrix from './components/matrix/matrix';
import DaemonList from './components/daemon-list/daemon-list';

import MatrixSequence from './game/matrix';

function App() {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    let matrix = new MatrixSequence();
    setMatrix(matrix.getSequence());
  }, []);

  return (
    <div>
      <Header />
      <div className="status">
        <Timer />
        <Buffer />
      </div>
      <div className="interface">
        <Matrix matrix={matrix} />
        <DaemonList />
      </div>
    </div>
  );
}

export default App;
