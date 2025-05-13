import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';  // Importa Elements
import { loadStripe } from '@stripe/stripe-js';  // Importa loadStripe
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Checkout from './Checkout';
import Cart from './components/CartComponent';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartProvider';
import HistorialPedidos from './HistorialPedidos';
import DashboardAdmin from './admin/DashboardAdmin';
import PedidosAdmin from './admin/PedidosAdmin';
import LoginAdmin from './admin/Login';
import ClientesList from './admin/ClientesList';
import ProductosAdmin from './admin/ProductosAdmin';
import AgregarProducto from './admin/AgregarProducto';
import Catalogos from './admin/Catalogos';

// Cargar Stripe con tu public key
const stripePromise = loadStripe('pk_test_51RNfDME40jbMpv95v3z7xBPQOnpS8DiJ11khlZBcbX8tGVowyVvMobZHQCzqwoPmwqHyVziL4UamFmibQWGm8DOP00jmgEdJMO');

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <div className="content-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Products />} />
          
          {/* Envolvemos el Checkout con el contexto de Stripe */}
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>  {/* Aquí envuelves Checkout */}
                <Checkout />
              </Elements>
            }
          />
          
          <Route path="/cart" element={<Cart />} />
          <Route path='/pedidos' element={<HistorialPedidos />}></Route>

          {/* Rutas de administrador */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/pedidos" element={<PedidosAdmin />} />
          <Route path="/admin/clientes" element={<ClientesList />} />
          <Route path="/admin/productos" element={<ProductosAdmin />} />
          <Route path="/admin/agregar-producto" element={<AgregarProducto />} />
          <Route path="/admin/catalogos" element={<Catalogos />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppWrapper />
      </Router>
    </CartProvider>
  );
}

export default App;
