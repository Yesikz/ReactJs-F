import React, { useState } from "react";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function Pago() {
  const { itemsCarrito, total, vaciarCarrito } = usarCarrito();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    ciudad: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  function manejarCambio(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function manejarSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setMensaje("Compra realizada con éxito. ¡Gracias por elegir YUME!");
      vaciarCarrito();
    }, 1000);
  }

  return (
    <div>
      <h2>Pago</h2>
      {mensaje ? (
        <p>{mensaje}</p>
      ) : (
        <div style={{ display: "flex", gap: 24 }}>
          <form
            onSubmit={manejarSubmit}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
          >
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={manejarCambio} required />
            <label>Apellido</label>
            <input name="apellido" value={form.apellido} onChange={manejarCambio} required />
            <label>Correo</label>
            <input type="email" name="email" value={form.email} onChange={manejarCambio} required />
            <label>Dirección</label>
            <input name="direccion" value={form.direccion} onChange={manejarCambio} required />
            <label>Ciudad</label>
            <input name="ciudad" value={form.ciudad} onChange={manejarCambio} required />
            <button type="submit" disabled={enviando}>
              {enviando ? "Procesando..." : "Finalizar compra"}
            </button>
          </form>
          <aside style={{ width: 320 }}>
            <h3>Resumen</h3>
            {itemsCarrito.map((i) => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{i.title} x{i.cantidad}</span>
                <span>${(i.price * i.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}