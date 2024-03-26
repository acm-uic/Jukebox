import './App.css'
import { Header } from './Header'

// context
import { VideoContextProvider, videoContext } from "./domain/videoContext";

// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import Contributor from './pages/Contributor';
import StatsPage from './pages/StatsPage';
import { SongControl } from './SongControl'

function App() {

  return (
    <VideoContextProvider>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/contributors" element={ <Contributor/> } />
        <Route path="/stats" element={ <StatsPage/> } />
      </Routes>
      <SongControl/>
    </VideoContextProvider>
  );
}

export default App
