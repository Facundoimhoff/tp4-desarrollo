import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          ⚽ Torneo
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Dashboard
          </Link>

          <Link className="btn btn-outline-light me-2" to="/equipos">
            Equipos
          </Link>

          <Link className="btn btn-outline-light me-2" to="/jugadores">
            Jugadores
          </Link>

          <Link className="btn btn-outline-light" to="/partidos">
            Partidos
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;