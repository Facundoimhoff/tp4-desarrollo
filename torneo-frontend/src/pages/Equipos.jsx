import { useEffect, useState } from "react";
import { getEquipos, crearEquipo } from "../services/api";

function Equipos() {
  const [equipos, setEquipos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");

  useEffect(() => {
    cargarEquipos();
  }, []);

  async function cargarEquipos() {
    const data = await getEquipos();
    setEquipos(data);
  }

  async function agregarEquipo(e) {
  e.preventDefault();

  console.log("BOTON FUNCIONA");

  try {
    const respuesta = await crearEquipo(nombre, localidad);

    console.log("RESPUESTA:", respuesta);

    setNombre("");
    setLocalidad("");

    cargarEquipos();

  } catch (error) {
    console.error("ERROR:", error);
  }
}

  return (
    <div className="container mt-4">

      <h1>Equipos</h1>

      <div className="card p-3 mb-4">

        <form onSubmit={agregarEquipo}>

          <div className="mb-3">
            <label className="form-label">
              Nombre
            </label>

            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Localidad
            </label>

            <input
              className="form-control"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Agregar Equipo
          </button>

        </form>

      </div>

      <div className="row">

        {equipos.map((equipo) => (

          <div
            key={equipo.idEquipo}
            className="col-md-4 mb-3"
          >

            <div className="card p-3">

              <h5>{equipo.nombre}</h5>

              <p>{equipo.localidad}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Equipos;