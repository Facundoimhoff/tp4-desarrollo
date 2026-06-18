import { useEffect, useState } from "react";
import {
  getJugadores,
  crearJugador,
  getEquipos,
} from "../services/api";

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [dorsal, setDorsal] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [idEquipo, setIdEquipo] = useState("");

  useEffect(() => {
    cargarJugadores();
    cargarEquipos();
  }, []);

  async function cargarJugadores() {
    const data = await getJugadores();
    setJugadores(data);
  }

  async function cargarEquipos() {
    const data = await getEquipos();
    setEquipos(data);
  }

  async function agregarJugador(e) {
    e.preventDefault();

    await crearJugador(
      nombre,
      apellido,
      Number(dni),
      Number(dorsal),
      localidad,
      Number(idEquipo)
    );

    setNombre("");
    setApellido("");
    setDni("");
    setDorsal("");
    setLocalidad("");
    setIdEquipo("");

    cargarJugadores();
  }

  return (
    <div className="container mt-4">

      <h1>Jugadores</h1>

      <div className="card p-3 mb-4">

        <form onSubmit={agregarJugador}>

          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Dorsal"
            value={dorsal}
            onChange={(e) => setDorsal(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={idEquipo}
            onChange={(e) => setIdEquipo(e.target.value)}
          >
            <option value="">
              Seleccionar equipo
            </option>

            {equipos.map((equipo) => (
              <option
                key={equipo.idEquipo}
                value={equipo.idEquipo}
              >
                {equipo.nombre}
              </option>
            ))}
          </select>

          <button
            className="btn btn-success"
            type="submit"
          >
            Agregar Jugador
          </button>

        </form>

      </div>

      <div className="row">

        {jugadores.map((jugador) => (

          <div
            key={jugador.idJugador}
            className="col-md-4 mb-3"
          >

            <div className="card p-3">

              <h5>
                {jugador.nombre} {jugador.apellido}
              </h5>

              <p>DNI: {jugador.dni}</p>

              <p>
                Equipo: {jugador.equipo?.nombre || "Sin equipo"}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Jugadores;