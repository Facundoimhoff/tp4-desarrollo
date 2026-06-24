import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [partidos, setPartidos] = useState([]);
  const [goles, setGoles] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [partidosRes, golesRes] = await Promise.all([
        api.get("/partidos"),
        api.get("/goles")
      ]);

      setPartidos(partidosRes.data);
      setGoles(golesRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-4">

      <div className="text-center mb-5">
        <h1>Copa Sudamericana 2025</h1>

        <p className="mt-3">
          Sistema de gestión de equipos, jugadores,
          partidos y estadísticas del torneo.
        </p>

        <Button
          as={Link}
          to="/dashboard"
          variant="primary"
        >
          Ir al Dashboard
        </Button>
      </div>

      <Row>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              Próximos Partidos
            </Card.Header>

            <Card.Body>

              <Table striped hover>

                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Local</th>
                    <th>Visitante</th>
                  </tr>
                </thead>

                <tbody>

                  {partidos.length === 0 ? (
                    <tr>
                      <td colSpan="3">
                        No hay partidos cargados.
                      </td>
                    </tr>
                  ) : (
                    partidos.map((p) => (
                      <tr key={p.idPartido}>
                        <td>
                          {new Date(
                            p.fecha
                          ).toLocaleDateString("es-AR")}
                        </td>

                        <td>
                          {p.local?.nombre}
                        </td>

                        <td>
                          {p.visitante?.nombre}
                        </td>
                      </tr>
                    ))
                  )}

                </tbody>

              </Table>

            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              Últimos Goles Registrados
            </Card.Header>

            <Card.Body>

              <Table striped hover>

                <thead>
                  <tr>
                    <th>Jugador</th>
                    <th>Equipo</th>
                    <th>Minuto</th>
                  </tr>
                </thead>

                <tbody>

                  {goles.length === 0 ? (
                    <tr>
                      <td colSpan="3">
                        No hay goles registrados.
                      </td>
                    </tr>
                  ) : (
                    [...goles]
                      .reverse()
                      .slice(0, 5)
                      .map((g) => (
                        <tr key={g.idGol}>
                          <td>
                            {g.jugador?.apellido}
                          </td>

                          <td>
                            {g.equipo?.nombre}
                          </td>

                          <td>
                            {g.minuto}'
                          </td>
                        </tr>
                      ))
                  )}

                </tbody>

              </Table>

            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
}

export default Home;