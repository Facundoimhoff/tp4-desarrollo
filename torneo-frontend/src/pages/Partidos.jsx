import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import api from "../services/api";

import {
  Button,
  Form,
  Table,
  Card
} from "react-bootstrap";

function Partidos() {

  const {
    partidos,
    equipos,
    cargarPartidos
  } = useContext(AppContext);

  const [form, setForm] = useState({
    fecha: "",
    estado: "Programado",
    idEquipoLocal: "",
    idEquipoVisitante: ""
  });

  const crearPartido = async (e) => {
    e.preventDefault();

    if (
      Number(form.idEquipoLocal) ===
      Number(form.idEquipoVisitante)
    ) {
      alert(
        "El equipo local y visitante no pueden ser iguales"
      );
      return;
    }

    try {

      await api.post("/partidos", {
        ...form,
        idTorneo: 1
      });

      setForm({
        fecha: "",
        estado: "Programado",
        idEquipoLocal: "",
        idEquipoVisitante: ""
      });

      cargarPartidos();

    } catch (error) {
      console.log(error);
      alert("Error al crear partido");
    }
  };

  const eliminarPartido = async (id) => {
    try {
      await api.delete(`/partidos/${id}`);
      cargarPartidos();
    } catch (error) {
      console.log(error);
    }
  };

  const finalizarPartido = async (id) => {

  try {

    await api.patch(
      `/partidos/${id}/finalizar`
    );

    cargarPartidos();

  } catch (error) {

    console.log(error);

  }

};

  const calcularResultado = (partido) => {

    if (!partido.goles) {
      return "0 - 0";
    }

    const golesLocal =
      partido.goles.filter(
        (g) =>
          g.idEquipo ===
          partido.idEquipoLocal
      ).length;

    const golesVisitante =
      partido.goles.filter(
        (g) =>
          g.idEquipo ===
          partido.idEquipoVisitante
      ).length;

    return `${golesLocal} - ${golesVisitante}`;
  };

  return (
    <>
      <h2>Partidos</h2>

      <Card className="shadow-sm border-0 p-4 mb-4">

        <Form onSubmit={crearPartido}>

          <Form.Control
            type="date"
            className="mb-2"
            value={form.fecha}
            onChange={(e) =>
              setForm({
                ...form,
                fecha: e.target.value
              })
            }
          />

          <Form.Select
            className="mb-2"
            value={form.idEquipoLocal}
            onChange={(e) =>
              setForm({
                ...form,
                idEquipoLocal: Number(
                  e.target.value
                )
              })
            }
          >
            <option value="">
              Equipo Local
            </option>

            {equipos.map((e) => (
              <option
                key={e.idEquipo}
                value={e.idEquipo}
              >
                {e.nombre}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            className="mb-2"
            value={form.idEquipoVisitante}
            onChange={(e) =>
              setForm({
                ...form,
                idEquipoVisitante: Number(
                  e.target.value
                )
              })
            }
          >
            <option value="">
              Equipo Visitante
            </option>

            {equipos
              .filter(
                (e) =>
                  e.idEquipo !==
                  Number(form.idEquipoLocal)
              )
              .map((e) => (
                <option
                  key={e.idEquipo}
                  value={e.idEquipo}
                >
                  {e.nombre}
                </option>
              ))}
          </Form.Select>

          <Button
          type="submit"
          variant="primary"
          className="w-100"
          >
            Crear Partido
          </Button>

        </Form>

      </Card>

      <Table striped bordered hover>

        <thead>
          <tr>
            <th>Fecha</th>
            <th>Partido</th>
            <th>Estado</th>
            <th>Resultado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {partidos.map((p) => (

            <tr key={p.idPartido}>

              <td>
                {new Date(
                  p.fecha
                ).toLocaleDateString(
                  "es-AR"
                )}
              </td>

              <td>

  <div className="fw-bold mb-3">
    {p.local?.nombre} vs {p.visitante?.nombre}
  </div>

  {p.goles && (

    <>

      <div className="border rounded p-2 mb-2 bg-light">

        <strong className="text-primary">
          🏠 {p.local?.nombre}
        </strong>

        <div className="mt-2 ms-3">

          {p.goles
            .filter(
              (g) => g.idEquipo === p.idEquipoLocal
            )
            .sort(
              (a, b) => a.minuto - b.minuto
            )
            .map((g) => (

              <div key={g.idGol}>
                ⚽ {g.jugador?.apellido} ({g.minuto}')
              </div>

            ))}

          {p.goles.filter(
            (g) => g.idEquipo === p.idEquipoLocal
          ).length === 0 && (

            <small className="text-muted">
              Sin goles
            </small>

          )}

        </div>

      </div>

      <div className="border rounded p-2 bg-light">

        <strong className="text-danger">
          🚌 {p.visitante?.nombre}
        </strong>

        <div className="mt-2 ms-3">

          {p.goles
            .filter(
              (g) => g.idEquipo === p.idEquipoVisitante
            )
            .sort(
              (a, b) => a.minuto - b.minuto
            )
            .map((g) => (

              <div key={g.idGol}>
                ⚽ {g.jugador?.apellido} ({g.minuto}')
              </div>

            ))}

          {p.goles.filter(
            (g) => g.idEquipo === p.idEquipoVisitante
          ).length === 0 && (

            <small className="text-muted">
              Sin goles
            </small>

          )}

        </div>

      </div>

    </>

  )}

</td>

             <td className="text-center">

  {p.estado === "Programado" ? (

    <span className="badge bg-warning text-dark px-3 py-2">
      ⏳ Programado
    </span>

  ) : (

    <span className="badge bg-success px-3 py-2">
      ✅ Finalizado
    </span>

  )}

</td>

              <td>
                {calcularResultado(
                  p
                )}
              </td>

<td className="text-center align-middle">

  <div className="d-flex justify-content-center gap-2 flex-wrap">

    {p.estado === "Programado" && (
      <Button
        variant="success"
        size="sm"
        onClick={() =>
          finalizarPartido(p.idPartido)
        }
      >
        ✓ Finalizar
      </Button>
    )}

    <Button
      variant="outline-danger"
      size="sm"
      onClick={() =>
        eliminarPartido(p.idPartido)
      }
    >
      🗑 Eliminar
    </Button>

  </div>

</td>

            </tr>

          ))}

        </tbody>

      </Table>

    </>
  );
}

export default Partidos;
