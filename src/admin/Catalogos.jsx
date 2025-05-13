// src/components/Catalogos.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Catalogos.css';

function Catalogos() {
  const [catalogos, setCatalogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: null, nombre: '', imagenUrl: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCatalogos = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/catalogos');
      const data = await res.json();
      setCatalogos(data);
    } catch (err) {
      Swal.fire('Error', 'No se pudieron cargar los catálogos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogos();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica para el formulario
    if (!form.nombre) {
      Swal.fire('Error', 'El nombre del catálogo es obligatorio', 'error');
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/api/catalogos/${form.id}`
      : 'http://localhost:8080/api/catalogos';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al guardar el catálogo');

      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Catálogo actualizado' : 'Catálogo creado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });

      // Resetear formulario después de crear o editar
      setForm({ id: null, nombre: '', imagenUrl: '' });
      setIsEditing(false);
      fetchCatalogos();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleEdit = (catalogo) => {
    setForm(catalogo);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el catálogo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:8080/api/catalogos/${id}`, { method: 'DELETE' });
        Swal.fire('Eliminado', 'Catálogo eliminado con éxito', 'success');
        fetchCatalogos();
      } catch {
        Swal.fire('Error', 'No se pudo eliminar el catálogo', 'error');
      }
    }
  };

  return (
    <div className="catalogos-container">
      <h2>Gestión de Catálogos</h2>

      <form onSubmit={handleSubmit} className="catalog-form">
        <div>
          <label htmlFor="nombre">Nombre del catálogo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre del catálogo"
            value={form.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imagenUrl">URL de la imagen</label>
          <input
            type="text"
            id="imagenUrl"
            name="imagenUrl"
            placeholder="URL de la imagen"
            value={form.imagenUrl}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>

      {loading ? (
        <p>Cargando catálogos...</p>
      ) : (
        <div className="catalogos-list">
          {catalogos.map((cat) => (
            <div key={cat.id} className="catalogo-card">
              <img
                src={cat.imagenUrl || 'https://via.placeholder.com/150'}
                alt={cat.nombre}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <h3>{cat.nombre}</h3>
              <div className="catalog-actions">
                <button onClick={() => handleEdit(cat)}>Editar</button>
                <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogos;
