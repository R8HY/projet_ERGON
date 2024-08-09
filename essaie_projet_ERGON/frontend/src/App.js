import './App.css';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import Guest from './Components/Guest';
import ListeClients from './Components/ListeClients';


function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Guest />} />
          <Route path="/ListeClients" element={<ListeClients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;