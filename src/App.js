import './App.css';

import Header from './components/header/header';
import Timer from './components/timer/timer';
import Buffer from './components/buffer/buffer';
import Matrix from './components/matrix/matrix';
import DaemonList from './components/daemon-list/daemon-list';

function App() {
  return (
    <div>
      <Header />
      <div className="status">
        <Timer />
        <Buffer />
      </div>
      <div className="interface">
        <Matrix />
        <DaemonList />
      </div>
    </div>
  );
}

export default App;
