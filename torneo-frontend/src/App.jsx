import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomNavbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";
import Jugadores from "./pages/Jugadores";
import Partidos from "./pages/Partidos";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/partidos" element={<Partidos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;