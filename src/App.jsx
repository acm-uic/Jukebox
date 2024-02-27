
import './App.css'
import { AdrianKnight } from './components/Contributors'
import { OwenNeal } from './components/Contributors'
import StatVideoCard from './components/StatVideoCard'

function App() {
  const video = {
    title: 'Title',
    length: '387'
  }
  return (
    <>
      <AdrianKnight/>
      <OwenNeal/>
      <StatVideoCard video={video}/>
    </>
    )
  }

export default App
