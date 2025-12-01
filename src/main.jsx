import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ProveedorCarrito } from "./contextos/ContexCarrito";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProveedorCarrito>
        <App />
      </ProveedorCarrito>
    </BrowserRouter>
  </React.StrictMode>
);