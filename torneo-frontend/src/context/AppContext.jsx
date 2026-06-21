import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);

  const cargarEquipos = async () => {
    try {
      const res = await api.get("/equipos");
      setEquipos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarJugadores = async () => {
    try {
      const res = await api.get("/jugadores");
      setJugadores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarPartidos = async () => {
    try {
      const res = await api.get("/partidos");
      setPartidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarEquipos();
    cargarJugadores();
    cargarPartidos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        equipos,
        setEquipos,
        jugadores,
        setJugadores,
        partidos,
        setPartidos,
        cargarEquipos,
        cargarJugadores,
        cargarPartidos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;