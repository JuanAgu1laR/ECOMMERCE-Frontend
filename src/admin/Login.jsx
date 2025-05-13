// src/admin/LoginAdmin.js
import React, { useState } from 'react';

function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = {
      username,   // Usamos el nombre de usuario en lugar de 'email'
      password,   // La contraseña
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {  // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),  // Enviar el objeto con username y password
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Si el login es exitoso, puedes almacenar el rol y username en localStorage
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          role: data.role,
        }));

        // Redirigir al dashboard del administrador (o la ruta que prefieras)
        window.location.href = '/admin/dashboard'; 
      } else {
        setError(data.message);  // Mostrar el mensaje de error que viene del backend
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Administrador</h2>
        {error && <div className="error">{error}</div>}
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
