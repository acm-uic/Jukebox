import ReactPlayer from 'react-player'
import './App.css'
import { Header } from './Header'
import { AdrianKnight,OwenNeal,Andre,Manh,EthanKy } from './components/Contributors'

import { VideoPlayer } from './components/VideoPlayer'
import StatsPage from './pages/StatsPage'

function App() {
  
  return (
    <>
      <Header/>
      <VideoPlayer/>
      <div>
        <AdrianKnight/>
        <OwenNeal/>
        <Andre/>
        <Manh/>
        <EthanKy />
      </div>
      <StatsPage />
    </>
    )
  }

export default App
