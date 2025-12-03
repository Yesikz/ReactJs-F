import React from "react";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = usarCarrito();

  return (
    <div className="tarjeta-producto">
      <img src={producto.image} alt={producto.title} />

      <h3>{producto.title}</h3>

      <p className="precio">${producto.price.toFixed(2)}</p>

      <button onClick={() => agregarAlCarrito(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
}
