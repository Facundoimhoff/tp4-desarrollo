import { useContext } from "react";
import { Row, Col } from "react-bootstrap";

import AppContext from "../context/AppContext";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const {
    equipos,
    jugadores,
    partidos,
  } = useContext(AppContext);

  return (
    <>
      <h2 className="mb-4">
        Dashboard
      </h2>

      <Row>
        <Col md={4}>
          <StatsCard
            titulo="Equipos"
            valor={equipos.length}
          />
        </Col>

        <Col md={4}>
          <StatsCard
            titulo="Jugadores"
            valor={jugadores.length}
          />
        </Col>

        <Col md={4}>
          <StatsCard
            titulo="Partidos"
            valor={partidos.length}
          />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;