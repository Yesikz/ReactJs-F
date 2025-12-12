import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { ProveedorCarrito } from "./contextos/ContexCarrito";
import { AuthProvider } from "./contextos/AuthContext";
import { ProductsProvider } from "./contextos/ProductsContext"; 

import { HelmetProvider } from "react-helmet-async";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProductsProvider>   
            <ProveedorCarrito>
              <App />
            </ProveedorCarrito>
          </ProductsProvider>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
