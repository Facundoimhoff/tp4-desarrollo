import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import api from "../services/api";
import {
 Button,
 Form,
 Table,
 Card
} from "react-bootstrap";

function Equipos() {
 const { equipos, cargarEquipos } = useContext(AppContext);

 const [nombre, setNombre] = useState("");
 const [localidad, setLocalidad] = useState("");

const crearEquipo = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/equipos", {
      nombre,
      localidad,
      idTorneo: 1
    });

    console.log("CREADO:", res.data);

    setNombre("");
    setLocalidad("");

    cargarEquipos();

  } catch (error) {
    console.error("ERROR CREANDO EQUIPO");

    console.log(error);

    if (error.response) {
      console.log(error.response.data);
    }
  }
};

 const eliminarEquipo = async (id) => {
  await api.delete(`/equipos/${id}`);
  cargarEquipos();
 };

 return (
  <>
   <h2>Equipos</h2>

   <Card className="p-3 mb-4">
    <Form onSubmit={crearEquipo}>
     <Form.Group className="mb-2">
      <Form.Control
       placeholder="Nombre"
       value={nombre}
       onChange={(e) => setNombre(e.target.value)}
      />
     </Form.Group>

     <Form.Group className="mb-2">
      <Form.Control
       placeholder="Localidad"
       value={localidad}
       onChange={(e) => setLocalidad(e.target.value)}
      />
     </Form.Group>

     <Button type="submit">
      Crear Equipo
     </Button>
    </Form>
   </Card>

   <Table striped bordered>
    <thead>
     <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Localidad</th>
      <th></th>
     </tr>
    </thead>

    <tbody>
     {equipos.map((equipo) => (
      <tr key={equipo.idEquipo}>
       <td>{equipo.idEquipo}</td>
       <td>{equipo.nombre}</td>
       <td>{equipo.localidad}</td>

       <td>
        <Button
         variant="danger"
         onClick={() =>
          eliminarEquipo(equipo.idEquipo)
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

export default Equipos;