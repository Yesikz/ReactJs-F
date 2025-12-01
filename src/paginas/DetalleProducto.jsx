import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTOS_ENDPOINT } from "../api";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito } = usarCarrito();

  useEffect(() => {
    fetch(`${PRODUCTOS_ENDPOINT}/${id}`)
      .then((res) => res.json())
      .then(setProducto)
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando producto...</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <img src={producto.image} alt={producto.title} width="300" />
      <div>
        <h2>{producto.title}</h2>
        <p>{producto.description}</p>
        <p className="precio">${producto.price}</p>
        <button className="comprar-btn" onClick={() => agregarAlCarrito(producto)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}