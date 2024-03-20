import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/home'
import Calendar from './components/pages/calendar'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/calendar' element={<Calendar/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
