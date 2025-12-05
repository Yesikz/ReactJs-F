import React, { useState } from "react";
import { usarCarrito } from "../contextos/ContexCarrito";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pago() {
  const { itemsCarrito, total, vaciarCarrito } = usarCarrito();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    ciudad: "",
  });

  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => v.trim() === "")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (!form.email.includes("@")) {
      toast.error("El correo electrónico no es válido");
      return;
    }

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      toast.success("Compra realizada con éxito. ¡Gracias por elegir YUME! 💖");

      vaciarCarrito();
    }, 1500);
  };

  return (
    <div className="pago-contenedor">
      <h2 className="titulo-pago">Finalizar Compra</h2>

      <div className="pago-flex">
        
        <form className="pago-form" onSubmit={manejarSubmit}>
          <h3>Datos del comprador</h3>

          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={manejarCambio}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={manejarCambio}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={manejarCambio}
            required
          />

          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={manejarCambio}
            required
          />

          <label>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={form.ciudad}
            onChange={manejarCambio}
            required
          />

          <button className="btn-comprar" disabled={cargando}>
            {cargando ? "Procesando pago..." : "Confirmar compra"}
          </button>
        </form>

      
        <div className="pago-resumen">
          <h3>Resumen del pedido</h3>
          <hr />

          {itemsCarrito.map((item) => (
            <div key={item.id} className="pago-item">
              <span>
                {item.title} x {item.cantidad}
              </span>
              <strong>${(item.price * item.cantidad).toFixed(2)}</strong>
            </div>
          ))}

          <hr />
          <div className="pago-total">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
