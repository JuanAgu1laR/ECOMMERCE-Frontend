import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Asignar un id único (por ejemplo, generarlo o usar algo preexistente en tu aplicación)
  const [id] = useState(Date.now()); // Usamos el timestamp como ejemplo para el 'id'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      id,            // Enviar el id generado
      direccion: address,   // Enviar la dirección
      email,         // Enviar el correo
      nombre: name,  // Enviar el nombre
      password,      // Enviar la contraseña
      telefono: phone // Enviar el teléfono
    };

    try {
      const response = await fetch('http://localhost:8080/auth/register-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Error al registrar usuario');

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // Guardar el usuario registrado en el localStorage
      window.location.href = '/login'; // Redirigir a login después de registro
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page"> {/* Contenedor principal para el centrado y el fondo */}
      <div className="register-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <p className="subtitle">Crea una nueva cuenta</p>

          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

          <button type="submit" disabled={loading} className="btn-register">
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <p className="login-link">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
