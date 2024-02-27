import './App.css'
import { Header } from './Header'
import { AdrianKnight,OwenNeal,Andre,Manh,EthanKy } from './components/Contributors'


function App() {

  return (
    <>
      <Header/>
      <div>
        <AdrianKnight/>
        <OwenNeal/>
        <Andre/>
        <Manh/>
        <EthanKy />
      </div>
    </>
    )
  }

export default App
