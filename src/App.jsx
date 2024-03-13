import './App.css'
import { Header } from './Header'


// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import Contributor from './pages/Contributor';
import StatsPage from './pages/StatsPage';

function App() {
  
  return (
    <>
      <Header/>
      <div className='pt-[96px]'>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/contributors" element={ <Contributor/> } />
          <Route path="/stats" element={ <StatsPage/> } />
        </Routes>
      </div>
    </>
    
  )
}

export default App
