import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setAutenticado }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const manejarCambio = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      setAutenticado(true);   
      navigate("/");          
    } else {
      setError("Debes completar todos los campos.");
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
