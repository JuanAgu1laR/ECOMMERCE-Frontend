import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';

function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/pedidos/admin/pedidos')
      .then(response => {
        setPedidos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar pedidos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📦 Historial de Pedidos</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Cargando pedidos...</p>
        </div>
      ) : pedidos.length === 0 ? (
        <p className="text-center">No hay pedidos registrados.</p>
      ) : (
        pedidos.map(pedido => (
          <Card className="mb-4 shadow-sm border-0" key={pedido.id}>
            <Card.Header className="bg-primary text-white d-flex justify-content-between">
              <div><strong>Pedido #{pedido.id}</strong></div>
              <div><small>{pedido.fecha}</small></div>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-2">👤 {pedido.cliente.nombre}</h5>
              <p className="mb-1"><strong>Email:</strong> {pedido.cliente.email}</p>
              <p className="mb-1"><strong>Teléfono:</strong> {pedido.cliente.telefono}</p>
              <p className="mb-3"><strong>Dirección:</strong> {pedido.cliente.direccion}</p>

              <h6 className="text-muted">🛒 Detalles del pedido:</h6>
              <ul className="list-group mb-3">
                {pedido.detalles.map((detalle, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <div>{detalle.nombre} x {detalle.cantidad}</div>
                    <div>${(detalle.precio * detalle.cantidad).toFixed(2)}</div>
                  </li>
                ))}
              </ul>

              <div className="text-end">
                <h5 className="text-success">Total: ${pedido.total.toFixed(2)}</h5>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default PedidosAdmin;
