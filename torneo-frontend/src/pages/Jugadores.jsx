import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import api from "../services/api";
import {
 Button,
 Form,
 Table,
 Card
} from "react-bootstrap";

function Jugadores() {

 const {
  jugadores,
  equipos,
  cargarJugadores
 } = useContext(AppContext);

 const [form, setForm] = useState({
  nombre: "",
  apellido: "",
  dni: "",
  idEquipo: ""
 });

 const crearJugador = async (e) => {
  e.preventDefault();

  await api.post("/jugadores", {
   ...form
  });

  cargarJugadores();

  setForm({
   nombre: "",
   apellido: "",
   dni: "",
   idEquipo: ""
  });
 };

 const eliminarJugador = async (id) => {
  await api.delete(`/jugadores/${id}`);
  cargarJugadores();
 };

 return (
  <>
   <h2>Jugadores</h2>

   <Card className="p-3 mb-4">
    <Form onSubmit={crearJugador}>
     <Form.Control
      className="mb-2"
      placeholder="Nombre"
      value={form.nombre}
      onChange={(e) =>
       setForm({
        ...form,
        nombre: e.target.value
       })
      }
     />

     <Form.Control
      className="mb-2"
      placeholder="Apellido"
      value={form.apellido}
      onChange={(e) =>
       setForm({
        ...form,
        apellido: e.target.value
       })
      }
     />

     <Form.Control
      className="mb-2"
      placeholder="DNI"
      value={form.dni}
      onChange={(e) =>
       setForm({
        ...form,
        dni: e.target.value
       })
      }
     />

     <Form.Select
      className="mb-2"
      value={form.idEquipo}
      onChange={(e) =>
       setForm({
        ...form,
        idEquipo: e.target.value
       })
      }
     >
      <option value="">
       Seleccionar equipo
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

     <Button type="submit">
      Crear Jugador
     </Button>
    </Form>
   </Card>

   <Table striped bordered>
    <thead>
     <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>DNI</th>
      <th>Equipo</th>
      <th></th>
     </tr>
    </thead>

    <tbody>
     {jugadores.map((j) => (
      <tr key={j.idJugador}>
       <td>{j.nombre}</td>
       <td>{j.apellido}</td>
       <td>{j.dni}</td>
       <td>{j.equipo?.nombre}</td>

       <td>
        <Button
         variant="danger"
         onClick={() =>
          eliminarJugador(j.idJugador)
         }
        >
         Eliminar
        </Button>
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
  </>
 );
}

export default Jugadores;