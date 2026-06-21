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

  await api.post("/partidos", {
   ...form,
   idTorneo: 1
  });

  cargarPartidos();
 };

 const eliminarPartido = async (id) => {
  await api.delete(`/partidos/${id}`);
  cargarPartidos();
 };

 return (
  <>
   <h2>Partidos</h2>

   <Card className="p-3 mb-4">
    <Form onSubmit={crearPartido}>

     <Form.Control
      type="date"
      className="mb-2"
      onChange={(e) =>
       setForm({
        ...form,
        fecha: e.target.value
       })
      }
     />

     <Form.Select
      className="mb-2"
      onChange={(e) =>
       setForm({
        ...form,
        idEquipoLocal: Number(e.target.value)
       })
      }
     >
      <option>Equipo Local</option>

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
      onChange={(e) =>
       setForm({
        ...form,
        idEquipoVisitante: Number(e.target.value)
       })
      }
     >
      <option>Equipo Visitante</option>

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
      Crear Partido
     </Button>

    </Form>
   </Card>

   <Table striped bordered>
    <thead>
     <tr>
      <th>Fecha</th>
      <th>Local</th>
      <th>Visitante</th>
      <th>Estado</th>
      <th></th>
     </tr>
    </thead>

    <tbody>
     {partidos.map((p) => (
      <tr key={p.idPartido}>
       <td>{p.fecha?.substring(0,10)}</td>
       <td>{p.local?.nombre}</td>
       <td>{p.visitante?.nombre}</td>
       <td>{p.estado}</td>

       <td>
        <Button
         variant="danger"
         onClick={() =>
          eliminarPartido(p.idPartido)
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

export default Partidos;