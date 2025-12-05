import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Registro({ setAutenticado }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repetir: "",
  });

  const navigate = useNavigate();

  const manejarCambio = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password || !form.repetir) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (form.password !== form.repetir) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const usuarioExistente = JSON.parse(localStorage.getItem("yume_usuario"));

    if (usuarioExistente && usuarioExistente.email === form.email) {
      toast.error("Ya existe un usuario con este email");
      return;
    }

    const usuario = {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("yume_usuario", JSON.stringify(usuario));

    setAutenticado(true);
    toast.success("Registro exitoso");
    navigate("/");
  };

  return (
    <div className="login-contenedor">
      <h2>Crear cuenta</h2>

      <form onSubmit={manejarSubmit}>
        <label>Nombre</label>
        <input name="nombre" onChange={manejarCambio} required />

        <label>Email</label>
        <input type="email" name="email" onChange={manejarCambio} required />

        <label>Contraseña</label>
        <input type="password" name="password" onChange={manejarCambio} required />

        <label>Repetir contraseña</label>
        <input type="password" name="repetir" onChange={manejarCambio} required />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
