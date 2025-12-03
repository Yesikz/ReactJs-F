import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTOS_ENDPOINT } from "../api";
import { usarCarrito } from "../contextos/ContexCarrito";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = usarCarrito();


  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(`${PRODUCTOS_ENDPOINT}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el producto");
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando)
    return (
      <h3 className="text-center mt-5 text-secondary">Cargando producto...</h3>
    );

  if (error)
    return (
      <h3 className="text-center text-danger mt-5">
        Ocurrió un error: {error}
      </h3>
    );

  if (!producto)
    return (
      <h3 className="text-center text-warning mt-5">
        No se encontró el producto.
      </h3>
    );

  return (
    <div className="container mt-4">
      <div className="row align-items-center">

      
        <div className="col-md-5 text-center">
          <img
            src={producto.image}
            alt={producto.title}
            className="img-fluid"
            style={{
              maxHeight: "380px",
              objectFit: "contain",
              borderRadius: "8px"
            }}
          />
        </div>

        
        <div className="col-md-7">
          <h2>{producto.title}</h2>

          <p className="text-muted">{producto.category?.toUpperCase()}</p>

          <p className="mt-3">{producto.description}</p>

          <h3 className="text-primary mt-4">
            ${producto.price.toFixed(2)}
          </h3>

          <button
            className="btn btn-dark btn-lg mt-4 px-5"
            onClick={() => {
              agregarAlCarrito(producto);
              toast.success("Producto agregado al carrito 🛒");
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <br /><br /><br />
    </div>
  );
}
