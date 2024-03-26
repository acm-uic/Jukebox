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
import { SongControl } from './SongControl'

function App() {
  let video = {
    id: 3,
    url: "Youtube.com", 
    title: "Lorem Ipsum is simply dummy",
    duration: 351,
    plays: 1,
    likes: 0,
    skips: 0,
    skiplimit: 10
  }

  return (
    <VideoContextProvider>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/contributors" element={ <Contributor/> } />
        <Route path="/stats" element={ <StatsPage/> } />
      </Routes>
      <SongControl video = {video} />
    </VideoContextProvider>
  );
}

export default App
