import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();  //  Esta línea es indispensable

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data));

        await Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Has iniciado sesión como ${data.username}`,
          confirmButtonColor: '#3085d6',
        });

        navigate('/productos');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: data.message || 'Credenciales inválidas',
          confirmButtonColor: '#d33',
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Ocurrió un error al iniciar sesión',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page"> {/* Añadimos el contenedor con la clase login-page */}
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Bienvenido de nuevo</h2>
          <p className="subtitle">Inicia sesión para continuar</p>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;