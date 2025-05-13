// src/admin/DashboardAdmin.js
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardAdmin.css'; // Archivo de estilos para el dashboard

function DashboardAdmin() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Panel Administrativo</h2>
      <div className="row">
        {/* Card de Pedidos */}
        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Pedidos</h5>
              <p className="card-text">Gestiona todos los pedidos realizados.</p>
              <Link to="/admin/pedidos" className="btn btn-primary">Ver Pedidos</Link>
            </div>
          </div>
        </div>

        {/* Card de Clientes */}
        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Gestiona los clientes registrados en el sistema.</p>
              <Link to="/admin/clientes" className="btn btn-primary">Ver Clientes</Link>
            </div>
          </div>
        </div>

        {/* Card de Productos */}
        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Gestiona los productos disponibles para los clientes.</p>
              <Link to="/admin/productos" className="btn btn-primary">Ver Productos</Link>
            </div>
          </div>
        </div>

        {/* Card de Usuarios */}
        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Catalogos</h5>
              <p className="card-text">Gestiona los caatalogos.</p>
              <Link to="/admin/catalogos" className="btn btn-primary">Ver Catalogos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
