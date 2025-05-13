import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos la solicitud GET para obtener los clientes
    axios.get('http://localhost:8080/api/clientes')
      .then(response => {
        setClientes(response.data);  // Guardamos los datos en el estado
        setLoading(false);           // Cambiamos el estado de carga a false
      })
      .catch(error => {
        console.error('Error al cargar los clientes:', error);
        setLoading(false);           // Cambiamos el estado de carga a false
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando clientes...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Clientes Registrados</h2>
      
      {clientes.length === 0 ? (
        <p className="text-center">No hay clientes registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ClientesList;
