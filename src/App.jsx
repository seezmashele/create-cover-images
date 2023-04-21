import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Playlist from "./pages/Playlist"
import Spotlight from "./pages/Spotlight"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/spotlight" element={<Spotlight />} />
      {/* <Route path="*" element={<Home />} /> */}
    </Routes>
  )
}

export default App
