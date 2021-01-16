import './App.css';

import Header from './components/header/header';
import Timer from './components/timer/timer';
import Buffer from './components/buffer/buffer';
import Matrix from './components/matrix/matrix';
import DaemonList from './components/daemon-list/daemon-list';

function App() {
  return (
    <div className="App">
      <Header />
      <Timer />
      <Buffer />
      <Matrix />
      <DaemonList />
    </div>
  );
}

export default App;
