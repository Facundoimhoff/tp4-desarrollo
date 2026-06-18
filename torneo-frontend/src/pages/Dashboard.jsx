function Dashboard() {
  return (
    <div className="container mt-4">

      <h1>Gestor de Torneo</h1>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card p-3">
            <h3>Equipos</h3>
            <p>Administrar equipos</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h3>Jugadores</h3>
            <p>Administrar jugadores</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h3>Partidos</h3>
            <p>Administrar partidos</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;