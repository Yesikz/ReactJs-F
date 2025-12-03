import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repetirPassword: "",
  });

  const navigate = useNavigate();

  const manejarCambio = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarSubmit = (e) => {
    e.preventDefault();

   
    if (!form.nombre || !form.email || !form.password) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (form.password !== form.repetirPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

   
    const usuarioExistente = JSON.parse(localStorage.getItem("yume_usuario"));
    if (usuarioExistente && usuarioExistente.email === form.email) {
      toast.error("Ya existe una cuenta con ese email.");
      return;
    }

    const nuevoUsuario = {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("yume_usuario", JSON.stringify(nuevoUsuario));
    toast.success("Registro exitoso. Ahora puedes iniciar sesión.");

    navigate("/login");
  };

  return (
    <div className="login-contenedor">
      <h2>Crear Cuenta</h2>

      <form onSubmit={manejarSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={manejarCambio}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={manejarCambio}
          required
        />

        <label>Repetir contraseña</label>
        <input
          type="password"
          name="repetirPassword"
          value={form.repetirPassword}
          onChange={manejarCambio}
          required
        />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
