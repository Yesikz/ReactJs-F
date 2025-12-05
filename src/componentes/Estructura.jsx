import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet-async";

export default function Estructura({ autenticado, setAutenticado }) {
  return (
    <>
      <Helmet>
        <title>YUME - Tienda Online</title>
        <meta
          name="description"
          content="YUME - eCommerce moderno con productos exclusivos. Compra segura, rápida y fácil."
        />
      </Helmet>

      
      <Navbar
        autenticado={autenticado}
        setAutenticado={setAutenticado}
      />

      <main className="container mt-5 pt-4" role="main">
        <Outlet />
      </main>

      <br /><br />

      <footer>
        <p>© 2025 YUME · Todos los derechos reservados</p>
        <br />
        <div className="mb-2">
          <a href="#" className="mx-2">Términos y Condiciones</a>
          <a href="#" className="mx-2">Preguntas Frecuentes</a>
          <a href="#" className="mx-2">Ayuda</a>
        </div>
        <br />
        <div className="social-icons">
          <a
            href="https://instagram.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px" }}
          >
            Instagram
          </a>

          <a
            href="https://facebook.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px" }}
          >
            Facebook
          </a>

          <a
            href="https://twitter.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px" }}
          >
            Twitter
          </a>
        </div>
      </footer>
    </>
  );
}
