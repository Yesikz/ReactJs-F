import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Estructura from "./componentes/Estructura";
import Home from "./paginas/Home";
import Productos from "./paginas/Productos";
import DetalleProducto from "./paginas/DetalleProducto";
import Carrito from "./paginas/Carrito";
import Pago from "./paginas/Pago";
import NoEncontrado from "./paginas/NoEncontrado";
import RouteP from "./componentes/RouteP";

export default function App() {
  const [autenticado, setAutenticado] = useState(false);

  return (
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
        
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}