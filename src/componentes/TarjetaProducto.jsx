import React from "react";

export default function TarjetaProducto({ producto, agregar }) {
  return (
    <div className="tarjeta-producto">
      <img src={producto.image} alt={producto.title} />
      <h3>{producto.title}</h3>
      <p className="precio">${producto.price}</p>
      <button onClick={() => agregar(producto)}>Agregar al carrito</button>
    </div>
  );
}