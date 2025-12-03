import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setAutenticado }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const manejarCambio = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarSubmit = (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem("yume_usuario"));

   
    if (!usuarioGuardado) {
      toast.error("No hay usuarios registrados. Crea una cuenta.");
      return;
    }

   
    if (form.email !== usuarioGuardado.email) {
      toast.error("El email no coincide.");
      return;
    }

  
    if (form.password !== usuarioGuardado.password) {
      toast.error("Contraseña incorrecta.");
      return;
    }

    
    toast.success(`Bienvenido/a ${usuarioGuardado.nombre}`);

    
    localStorage.setItem(
      "yume_sesion",
      JSON.stringify({ email: usuarioGuardado.email })
    );

    setAutenticado(true);
    navigate("/");
  };

  return (
    <div className="login-contenedor">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={manejarSubmit}>
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

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
