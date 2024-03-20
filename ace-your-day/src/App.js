import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/home'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' component={<Home/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
