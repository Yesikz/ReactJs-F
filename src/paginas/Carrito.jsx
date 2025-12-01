import React, { useState } from "react";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function Carrito() {
  const { itemsCarrito, total, vaciarCarrito, actualizarCantidad, eliminarDelCarrito } = usarCarrito();
  const [form, setForm] = useState({ nombre: "", email: "", direccion: "" });

  const manejarCambio = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert("Compra realizada con éxito. ¡Gracias por tu pedido!");
    vaciarCarrito();
    setForm({ nombre: "", email: "", direccion: "" });
  };

  if (itemsCarrito.length === 0) {
    return (
      <div className="carrito-contenedor">
        <h2>Tu carrito está vacío</h2>
        <p>Añade productos para continuar con la compra.</p>
      </div>
    );
  }

  return (
    <div className="carrito-contenedor">
      <h2>Finalizar Compra</h2>

      <div className="carrito-lista">
        {itemsCarrito.map((item) => (
          <div key={item.id} className="carrito-item">
            <img src={item.image} alt={item.title} />
            <div style={{ flex: 1, marginLeft: "12px" }}>
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label>Cantidad: </label>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(item.id, Math.max(1, Number(e.target.value)))
                  }
                />
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </div>
            </div>
            <div>
              <strong>${(item.price * item.cantidad).toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-total">
        <span>Total: ${total.toFixed(2)}</span>
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
      </div>

      <form onSubmit={manejarEnvio} style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={manejarCambio} required />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={manejarCambio} required />
        <label>Dirección</label>
        <input name="direccion" value={form.direccion} onChange={manejarCambio} required />
        <button className="comprar-btn" type="submit">Confirmar Compra</button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}