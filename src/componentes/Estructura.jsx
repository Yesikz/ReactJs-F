import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Estructura({ autenticado, setAutenticado }) {
  return (
    <>
      <Navbar autenticado={autenticado} setAutenticado={setAutenticado} />
      <main style={{ padding: "1rem", marginTop: "90px" }}>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 YUME · Todos los derechos reservados</p> <br />
        <div>Términos y Condiciones · Preguntas Frecuentes · Ayuda</div>
        <br />
        <div className="social-icons">
          <a href="https://instagram.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Instagram
    </a>
    <a href="https://facebook.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Facebook
    </a>
    <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Twiter
    </a>
    </div>
    </footer>
    </>
  );
}
