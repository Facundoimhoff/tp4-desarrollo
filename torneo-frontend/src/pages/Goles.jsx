import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  Form,
  Button,
  Table,
  Container
} from "react-bootstrap";

function Goles() {

  const [goles, setGoles] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [form, setForm] = useState({
    minuto: "",
    idPartido: "",
    idJugador: "",
    idEquipo: ""
  });

  const cargarDatos = async () => {
    try {
      const [
        golesRes,
        partidosRes,
        jugadoresRes,
        equiposRes
      ] = await Promise.all([
        api.get("/goles"),
        api.get("/partidos"),
        api.get("/jugadores"),
        api.get("/equipos")
      ]);

      setGoles(golesRes.data);
      setPartidos(partidosRes.data);
      setJugadores(jugadoresRes.data);
      setEquipos(equiposRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const crearGol = async (e) => {
    e.preventDefault();
     
    if (Number(form.minuto) < 1 || Number(form.minuto) > 90) {
  alert("El minuto debe estar entre 1 y 90");
  return;
        }
    
    try {
      await api.post("/goles", {
        minuto: Number(form.minuto),
        idPartido: Number(form.idPartido),
        idJugador: Number(form.idJugador),
        idEquipo: Number(form.idEquipo)
      });

      setForm({
        minuto: "",
        idPartido: "",
        idJugador: "",
        idEquipo: ""
      });

      cargarDatos();

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const eliminarGol = async (idGol) => {
    try {
      await api.delete(`/goles/${idGol}`);
      cargarDatos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-4">

      <h2 className="mb-4">
        Gestión de Goles
      </h2>

      <Card className="p-3 mb-4">

        <Form onSubmit={crearGol}>

          <Form.Group className="mb-3">
            <Form.Label>Partido</Form.Label>

            <Form.Select
              value={form.idPartido}
              onChange={(e) =>
                setForm({
                  ...form,
                  idPartido: e.target.value
                })
              }
            >
              <option value="">
                Seleccione un partido
              </option>

              {partidos.map((p) => (
                <option
                  key={p.idPartido}
                  value={p.idPartido}
                >
                  {p.local?.nombre} vs {p.visitante?.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
  <Form.Label>Equipo</Form.Label>

  <Form.Select
    value={form.idEquipo}
    onChange={(e) =>
      setForm({
        ...form,
        idEquipo: e.target.value,
        idJugador: ""
      })
    }
  >
    <option value="">
      Seleccione un equipo
    </option>

    {equipos.map((eq) => (
      <option
        key={eq.idEquipo}
        value={eq.idEquipo}
      >
        {eq.nombre}
      </option>
    ))}
  </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Jugador</Form.Label>

  <Form.Select
    value={form.idJugador}
    onChange={(e) =>
      setForm({
        ...form,
        idJugador: e.target.value
      })
    }
  >
    <option value="">
      Seleccione un jugador
    </option>

    {jugadores
      .filter(
        (j) =>
          Number(j.idEquipo) === Number(form.idEquipo)
      )
      .map((j) => (
        <option
          key={j.idJugador}
          value={j.idJugador}
        >
          {j.apellido}
        </option>
      ))}
  </Form.Select>
</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minuto</Form.Label>

           <Form.Control
              type="number"
              min="1"
              max="90"
              value={form.minuto}
              onChange={(e) =>
               setForm({
                ...form,
              minuto: e.target.value
                      })
                       }
           />
          </Form.Group>

          <Button type="submit">
            Registrar Gol
          </Button>

        </Form>

      </Card>

      <Table striped bordered hover>

        <thead>
          <tr>
            <th>ID</th>
            <th>Partido</th>
            <th>Jugador</th>
            <th>Equipo</th>
            <th>Minuto</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {goles.map((g) => (

            <tr key={g.idGol}>

              <td>{g.idGol}</td>

              <td>
              {new Date(g.partido?.fecha).toLocaleDateString("es-AR")}
            </td>

              <td>
                {g.jugador?.apellido}
              </td>

              <td>
                {g.equipo?.nombre}
              </td>

              <td>
                {g.minuto}'
              </td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    eliminarGol(g.idGol)
                  }
                >
                  Eliminar
                </Button>
              </td>

            </tr>

          ))}

        </tbody>

      </Table>

    </Container>
  );
}

export default Goles;