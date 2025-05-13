// src/components/Products.jsx
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './context/CartProvider';
import './Products.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function Products() {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos');
        if (!response.ok) throw new Error('No se pudieron cargar los productos');
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (producto) => {
    addToCart(producto);
    Swal.fire({
      icon: 'success',
      title: '¡Añadido al carrito!',
      text: producto.nombre,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">⚠️ {error}</div>;
  }

  return (
    <div className="products-container">
      <h1 className="main-title">SUBLINTER!</h1>

      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-item">
            <img
              src={producto.imagenUrl || 'https://via.placeholder.com/150'}
              alt={producto.nombre}
              className="product-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <div className="product-info">
              <h3 className="product-name">{producto.nombre}</h3>

              <p className="product-price"><strong>Precio:</strong> ${producto.precio.toFixed(0)}</p>
              {/* Botón de "Agregar al Carrito" */}
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(producto)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;