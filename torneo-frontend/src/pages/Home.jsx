import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {

  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    cargarPartidos();
  }, []);

  const cargarPartidos = async () => {
    try {
      const res = await api.get("/partidos");
      setPartidos(res.data);
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
        g => g.idEquipo === partido.idEquipoLocal
      ).length;

    const golesVisitante =
      partido.goles.filter(
        g => g.idEquipo === partido.idEquipoVisitante
      ).length;

    return `${golesLocal} - ${golesVisitante}`;
  };

  const programados =
    partidos.filter(
      p => p.estado === "Programado"
    );

  const finalizados =
    partidos.filter(
      p => p.estado === "Finalizado"
    );

  return (
    <Container>

      <div className="text-center mt-4 mb-5">

        <h1>Copa Sudamericana</h1>

        <p>
          Sistema de gestión de torneos,
          equipos, jugadores y resultados.
        </p>

        <Button
          as={Link}
          to="/dashboard"
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

              {programados.length === 0 ? (
                <p>No hay partidos programados.</p>
              ) : (
                programados.map((p) => (

                  <div
                    key={p.idPartido}
                    className="mb-3"
                  >
                    <strong>
                      {new Date(
                        p.fecha
                      ).toLocaleDateString(
                        "es-AR"
                      )}
                    </strong>

                    <br />

                    {p.local?.nombre}
                    {" vs "}
                    {p.visitante?.nombre}

                  </div>

                ))
              )}

            </Card.Body>

          </Card>

        </Col>

        <Col md={6}>

          <Card>

            <Card.Header>
              Resultados
            </Card.Header>

            <Card.Body>

              {finalizados.length === 0 ? (
                <p>No hay partidos finalizados.</p>
              ) : (
                finalizados.map((p) => (

                  <div
                    key={p.idPartido}
                    className="mb-4"
                  >

                    <strong>

                      {p.local?.nombre}

                      {" "}

                      {
                        calcularResultado(
                          p
                        )
                      }

                      {" "}

                      {p.visitante?.nombre}

                    </strong>

                    <div className="mt-3">

  <div className="border rounded p-2 mb-2 bg-light">

    <strong className="text-primary">
      🏠 {p.local?.nombre}
    </strong>

    <div className="ms-3 mt-2">

      {p.goles
        ?.filter(
          g => g.idEquipo === p.idEquipoLocal
        )
        .sort(
          (a, b) => a.minuto - b.minuto
        )
        .map((g) => (

          <div key={g.idGol}>
            ⚽ {g.jugador?.apellido} ({g.minuto}')
          </div>

        ))}

      {p.goles?.filter(
        g => g.idEquipo === p.idEquipoLocal
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

    <div className="ms-3 mt-2">

      {p.goles
        ?.filter(
          g => g.idEquipo === p.idEquipoVisitante
        )
        .sort(
          (a, b) => a.minuto - b.minuto
        )
        .map((g) => (

          <div key={g.idGol}>
            ⚽ {g.jugador?.apellido} ({g.minuto}')
          </div>

        ))}

      {p.goles?.filter(
        g => g.idEquipo === p.idEquipoVisitante
      ).length === 0 && (

        <small className="text-muted">
          Sin goles
        </small>

      )}

    </div>

  </div>

</div>

                  </div>

                ))
              )}

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default Home;

