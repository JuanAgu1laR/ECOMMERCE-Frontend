import React, { useEffect, useState } from 'react';
import './HistorialPedidos.css';
import Swal from 'sweetalert2';

function HistorialPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const clienteId = userData?.id;

        if (!clienteId) {
            Swal.fire({
                icon: 'error',
                title: 'No has iniciado sesión',
                text: 'Inicia sesión para ver tu historial de pedidos.',
            });
            return;
        }

        fetch(`http://localhost:8080/api/pedidos/cliente/${clienteId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Error al obtener pedidos');
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPedidos(data);
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener el historial de pedidos.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="historial-wrapper">
            <h2>Historial de Pedidos</h2>

            {loading ? (
                <p>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
                <p>No tienes pedidos aún.</p>
            ) : (
                pedidos.map((pedido) => (
                    <div className="pedido-card" key={pedido.id}>
                        <h4>Pedido #{pedido.id}</h4>
                        <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
                        <p><strong>Total:</strong> {pedido.total.toFixed(2)} MXN</p>

                        <h5>Productos:</h5>
                        <ul>
                            {pedido.detalles.map((detalle, index) => (
                                <li key={index}>
                                    {detalle.nombre} - {detalle.cantidad} x {detalle.precio} = {(detalle.cantidad * detalle.precio).toFixed(2)} MXN
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default HistorialPedidos;
