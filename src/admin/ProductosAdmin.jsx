import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Ahora usamos useNavigate

function ProductosAdmin() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const navigate = useNavigate(); // Usamos useNavigate

    useEffect(() => {
        axios.get('http://localhost:8080/api/productos')
            .then(response => {
                setProductos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
                setLoading(false);
            });
    }, []);

    const handleEliminar = (id) => {
        axios.delete(`http://localhost:8080/api/productos/${id}`)
            .then(() => {
                setProductos(productos.filter(producto => producto.id !== id));
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    };

    const handleEditar = (id) => {
        navigate(`/editar-producto/${id}`); // Usamos navigate en lugar de history.push
    };

    const handleAgregar = () => {
        navigate('/admin/agregar-producto'); // Usamos navigate en lugar de history.push
    };

    const handleShowModal = (id) => {
        setProductoAEliminar(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProductoAEliminar(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">🛒 Lista de Productos</h2>

            <Button variant="success" onClick={handleAgregar} className="mb-4">
                Agregar Producto
            </Button>

            {loading ? (
                <div className="text-center">
                    <p>Cargando productos...</p>
                </div>
            ) : productos.length === 0 ? (
                <p className="text-center">No hay productos registrados.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>
                                    <img src={producto.imagenUrl} alt={producto.nombre} width="50" />
                                </td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEditar(producto.id)}>
                                        Editar
                                    </Button>
                                    {' '}
                                    <Button variant="danger" onClick={() => handleShowModal(producto.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modal de confirmación para eliminar */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este producto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => handleEliminar(productoAEliminar)}
                    >
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductosAdmin;
