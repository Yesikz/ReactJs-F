import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contextos/ProductsContext";
import { toast } from "react-toastify";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { productos, actualizarProducto } = useProducts();

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    const producto = productos.find((p) => p.id === id);

    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        precio: producto.precio || "",
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
      });
    }
  }, [id, productos]);

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
      await actualizarProducto(id, form);
      toast.success("Producto actualizado con éxito");
      navigate("/admin-productos");
    } catch (error) {
      toast.error("Error al editar el producto");
    }
  };

  return (
    <div className="form-contenedor">
      <h2 className="form-titulo">Editar Producto</h2>

      <form onSubmit={manejarSubmit} className="formulario">
        <label className="form-label">Nombre:</label>
        <input
          className="form-input"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <label className="form-label">Precio:</label>
        <input
          className="form-input"
          type="number"
          name="precio"
          value={form.precio}
          onChange={manejarCambio}
          required
        />

        <label className="form-label">Descripción:</label>
        <textarea
          className="form-input"
          name="descripcion"
          value={form.descripcion}
          onChange={manejarCambio}
          required
        ></textarea>

        <label className="form-label">Imagen (URL):</label>
        <input
          className="form-input"
          name="imagen"
          value={form.imagen}
          onChange={manejarCambio}
        />

        <button type="submit" className="boton">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
