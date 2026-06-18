import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";
import Jugadores from "./pages/Jugadores";
import Partidos from "./pages/Partidos";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/partidos" element={<Partidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;