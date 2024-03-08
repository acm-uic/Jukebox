import './App.css'
import { Header } from './Header'


// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import Contributor from './pages/Contributor';
import Stats from './pages/Stats';

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/contributors" element={ <Contributor/> } />
        <Route path="/stats" element={ <Stats/> } />
      </Routes>
    </div>
    
  )
}

export default App
