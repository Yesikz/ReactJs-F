import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RouteP({ autenticado, children }) {
  const [esperar, setEsperar] = useState(true);
  const location = useLocation();

  
  useEffect(() => {
    const t = setTimeout(() => setEsperar(false), 200);
    return () => clearTimeout(t);
  }, []);

  if (esperar) return null;

  if (!autenticado) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          color: "#333",
        }}
      >
        <h2>🔒 Zona Protegida</h2>
        <p>Necesitás iniciar sesión para acceder a esta sección.</p>

        <a
          href="/login"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "linear-gradient(45deg, #8fd3f4, #84fab0)",
            padding: "10px 18px",
            borderRadius: "12px",
            color: "black",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Ir a iniciar sesión
        </a>

      
        <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
          Serás redirigido automáticamente...
        </p>

        <Navigate
          to="/login"
          replace
          state={{ from: location.pathname }}
        />
      </div>
    );
  }

  return children;
}


