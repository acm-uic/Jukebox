import './App.css'

import { AdrianKnight } from './components/Contributors'
import { OwenNeal } from './components/Contributors'
import { EthanKy } from './components/Contributors'
import { Header } from './Header'
import { AdrianKnight,OwenNeal,Andre,Manh } from './components/Contributors'


function App() {

  return (
    <>
      <Header/>
      <div>
        <AdrianKnight/>
        <OwenNeal/>
        <Andre/>
        <Manh/>
      </div>
    </>
    )
  }

export default App
