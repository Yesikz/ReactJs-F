import React, { useState, useEffect } from "react";
import { PRODUCTOS_ENDPOINT } from "../api";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = usarCarrito();

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError(null);

    fetch(PRODUCTOS_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        if (activo) setProductos(data);
      })
      .catch((e) => {
        if (activo) setError(e.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => (activo = false);
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Productos</h2>
      <div className="contenedor">
        {productos.map((p) => (
          <TarjetaProducto
            key={p.id}
            producto={p}
            agregar={agregarAlCarrito}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </section>
  
  );
}