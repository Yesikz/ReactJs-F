import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Estructura from "./componentes/Estructura";
import Home from "./paginas/Home";
import Productos from "./paginas/Productos";
import DetalleProducto from "./paginas/DetalleProducto";
import Carrito from "./paginas/Carrito";
import Pago from "./paginas/Pago";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import NoEncontrado from "./paginas/NoEncontrado";
import RouteP from "./componentes/RouteP";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("yume_sesion") === "true";
  });

  useEffect(() => {
    localStorage.setItem("yume_sesion", autenticado ? "true" : "false");
  }, [autenticado]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Estructura
              autenticado={autenticado}
              setAutenticado={setAutenticado}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          <Route path="carrito" element={<Carrito />} />

          <Route
            path="pago"
            element={
              <RouteP autenticado={autenticado}>
                <Pago />
              </RouteP>
            }
          />

          <Route
            path="login"
            element={<Login setAutenticado={setAutenticado} />}
          />

          <Route
            path="registro"
            element={<Registro setAutenticado={setAutenticado} />}
          />

          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
