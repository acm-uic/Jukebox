import ReactPlayer from 'react-player'
import './App.css'
import { AdrianKnight,OwenNeal,Andre } from './components/Contributors'
import { VideoPlayer } from './components/VideoPlayer'

function App() {

  return (
    <>
      <VideoPlayer/>
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'/>
      <AdrianKnight/>
      <OwenNeal/>
      <Andre/>
    </>
    )
  }

export default App
