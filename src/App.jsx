
import './App.css'
import { AdrianKnight } from './components/Contributors'
import { OwenNeal } from './components/Contributors'
import { EthanKy } from './components/Contributors'
import { Header } from './Header'
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
    <>
      <Header/>
      <div>
        <AdrianKnight/>
        <OwenNeal/>
        <EthanKy/>
      </div>
      <SongControl video = {video} />
    </>
    )
  }

export default App
