import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setAutenticado }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const manejarCambio = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem("yume_usuario"));

    if (!usuarioGuardado) {
      toast.error("No hay ninguna cuenta registrada.");
      return;
    }

    if (
      form.email === usuarioGuardado.email &&
      form.password === usuarioGuardado.password
    ) {
      setAutenticado(true);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } else {
      toast.error("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="login-contenedor">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={manejarCambio} required />

        <label>Contraseña</label>
        <input type="password" name="password" onChange={manejarCambio} required />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
