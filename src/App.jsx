
import './App.css'
import { AdrianKnight } from './components/Contributors'
import { OwenNeal } from './components/Contributors'
import { EthanKy } from './components/Contributors'
import { Header } from './Header'

function App() {

  return (
    <>
      <Header/>
      <div>
        <AdrianKnight/>
        <OwenNeal/>
        <EthanKy/>
      </div>
    </>
    )
  }

export default App
