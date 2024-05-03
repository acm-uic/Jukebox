import { Header } from "./components/Header";

// context
import { VideoContextProvider } from "./contexts/videoContext";

// routing
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Contributor from "./pages/Contributor";
import StatsPage from "./pages/StatsPage";
import { SongControl } from "./components/SongControl";

function App() {
  return (
    <VideoContextProvider>
      <Header />
      <div className="py-24 md:pb-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contributors" element={<Contributor />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
      <SongControl />
    </VideoContextProvider>
  );
}

export default App;
