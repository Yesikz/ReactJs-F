import React from "react";
import { Navigate } from "react-router-dom";

export default function RouteP({ autenticado, children }) {
  if (!autenticado) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          color: "#E8E1DB",
        }}
      >
        <h2>🔒 Acceso restringido</h2>
        <p>Debes iniciar sesión para continuar con el pago.</p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "linear-gradient(45deg, #969996, #d5f9ed)",
            padding: "8px 16px",
            borderRadius: "10px",
            color: "black",
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </a>
      </div>
    );
  }
  return children;
}