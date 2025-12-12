import React, { useState } from "react";
import { useProducts } from "../contextos/ProductsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CrearProducto() {
  const { agregarProducto } = useProducts();
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });


  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (Number(form.precio) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }

    if (form.descripcion.trim().length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }

    
    try {
      await agregarProducto(form);
      toast.success("Producto creado exitosamente");
      navigate("/admin-productos");
    } catch (error) {
      toast.error("No se pudo crear el producto");
    }
  };

  return (
    <div className="login-contenedor">
      <h2>Crear Producto</h2>

      <form onSubmit={manejarSubmit}>
        <label>Nombre:</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={manejarCambio}
          required
        />

        <label>Descripción:</label>
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={manejarCambio}
          required
        />

        <label>Imagen (URL):</label>
        <input
          name="imagen"
          value={form.imagen}
          onChange={manejarCambio}
        />

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}
