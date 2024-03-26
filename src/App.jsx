import './App.css'
import { Header } from './Header'

// context
import { VideoContextProvider } from "./domain/videoContext";

// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import Contributor from './pages/Contributor';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <VideoContextProvider>
      <Header/>
      <div className='pt-[96px]'>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/contributors" element={ <Contributor/> } />
          <Route path="/stats" element={ <StatsPage/> } />
        </Routes>
      </div>
    </VideoContextProvider>
    
  )
}

export default App
