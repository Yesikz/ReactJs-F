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
    <div className="container mt-4">
      <h2>Finalizar Compra</h2>

      <div className="row mt-4">
       
        <div className="col-md-7">
          <form
            onSubmit={manejarSubmit}
            className="card p-4 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <h4 className="mb-3">Datos del comprador</h4>

            <label className="fw-bold">Nombre</label>
            <input
              name="nombre"
              className="form-control mb-2"
              onChange={manejarCambio}
              value={form.nombre}
              required
            />

            <label className="fw-bold">Apellido</label>
            <input
              name="apellido"
              className="form-control mb-2"
              onChange={manejarCambio}
              value={form.apellido}
              required
            />

            <label className="fw-bold">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              onChange={manejarCambio}
              value={form.email}
              required
            />

            <label className="fw-bold">Dirección</label>
            <input
              name="direccion"
              className="form-control mb-2"
              onChange={manejarCambio}
              value={form.direccion}
              required
            />

            <label className="fw-bold">Ciudad</label>
            <input
              name="ciudad"
              className="form-control mb-3"
              onChange={manejarCambio}
              value={form.ciudad}
              required
            />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={cargando}
            >
              {cargando ? "Procesando pago..." : "Confirmar compra"}
            </button>
          </form>
        </div>

        
        <div className="col-md-5">
          <div className="card p-3 shadow-sm" style={{ borderRadius: "12px" }}>
            <h4>Resumen del pedido</h4>
            <hr />

            {itemsCarrito.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.title} x {item.cantidad}
                </span>
                <strong>${(item.price * item.cantidad).toFixed(2)}</strong>
              </div>
            ))}

            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
