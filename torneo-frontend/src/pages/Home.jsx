import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Gestor de Torneos</h1>

      <p className="mt-3">
        Aplicación para administrar equipos,
        jugadores y partidos de la Copa Sudamericana.
      </p>

      <Button
        as={Link}
        to="/dashboard"
        variant="primary"
      >
        Ir al Dashboard
      </Button>
    </div>
  );
}

export default Home;