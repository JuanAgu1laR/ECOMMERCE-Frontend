import React, { useState, useEffect } from "react";
import axios from "axios";

function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [catalogos, setCatalogos] = useState([]);
  const [catalogoId, setCatalogoId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener los catálogos disponibles
    axios.get("http://localhost:8080/api/catalogos")
      .then(response => setCatalogos(response.data))
      .catch(error => console.error("Error al cargar los catálogos:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      nombre,
      precio: parseFloat(precio),
      imagenUrl,
      catalogo: { id: catalogoId }
    };

    axios.post("http://localhost:8080/api/productos", newProduct)
      .then(response => setMessage("Producto agregado exitosamente"))
      .catch(error => setMessage("Error al agregar el producto"));
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Producto</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            id="precio"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagenUrl" className="form-label">URL de Imagen</label>
          <input
            type="text"
            id="imagenUrl"
            className="form-control"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="catalogo" className="form-label">Catálogo</label>
          <select
            id="catalogo"
            className="form-control"
            value={catalogoId}
            onChange={(e) => setCatalogoId(e.target.value)}
            required
          >
            <option value="">Seleccione un catálogo</option>
            {catalogos.map(catalogo => (
              <option key={catalogo.id} value={catalogo.id}>
                {catalogo.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
