// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
  return (
    <nav className="w-100" style={{ backgroundColor: '#E50914', padding: '10px 20px' }}> {/* Fondo rojo y padding */}
      <div className="container-fluid d-flex align-items-center justify-content-between"> {/* Contenedor flex para alinear elementos */}
        {/* Logo */}
        <Link className="navbar-brand" to="/productos" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5em' }}>
          Sublinter Online {/* Reemplazamos "Ecommerce" con "Sublinter Online" */}
        </Link>


        {/* Enlaces y botón de Iniciar Sesión */}
        <div>
          <ul className="navbar-nav ms-auto d-flex align-items-center" style={{ flexDirection: 'row', marginBottom: '0' }}>
            <li className="nav-item" style={{ marginLeft: '15px' }}>
              <Link className="nav-link" to="/pedidos" style={{ color: 'white' }}>Mis compras</Link>
            </li>
            <li className="nav-item" style={{ marginLeft: '15px' }}>
              <Link className="nav-link" to="/cart" style={{ color: 'white' }}>Mi Carrito</Link>
            </li>
            <li className="nav-item" style={{ marginLeft: '15px' }}>
              <Link className="nav-link" to="/login" style={{ color: 'white' }}>Ingresar</Link>
            </li>
          
          
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;