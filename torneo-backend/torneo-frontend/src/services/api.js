const API_URL = "http://localhost:3000/api";

// ====================
// EQUIPOS
// ====================

export async function getEquipos() {
  const response = await fetch(`${API_URL}/equipos`);
  return await response.json();
}

export async function crearEquipo(nombre, localidad) {
  const response = await fetch(`${API_URL}/equipos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      localidad,
      idTorneo: 1,
    }),
  });

  return await response.json();
}

// ====================
// JUGADORES
// ====================

export async function getJugadores() {
  const response = await fetch(`${API_URL}/jugadores`);
  return await response.json();
}

export async function crearJugador(
  nombre,
  apellido,
  dni,
  dorsal,
  localidad,
  idEquipo
) {
  const response = await fetch(`${API_URL}/jugadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellido,
      dni,
      dorsal,
      localidad,
      idEquipo,
    }),
  });

  return await response.json();
}