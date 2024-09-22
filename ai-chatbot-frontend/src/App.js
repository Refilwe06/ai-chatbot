import './App.css';
import Sidenav from './components/Sidenav';
import Header from './components/Header';

function App() {
  return (
    <div className="app-wrapper">
      <div className="sidenav">
        <Sidenav />
      </div>
      <div className="main-content">
        <Header />
      </div>
    </div>
  );
}

export default App;
