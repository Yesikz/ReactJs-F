import React from "react";
import { usarCarrito } from "../contextos/ContexCarrito";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Carrito() {
  const {
    itemsCarrito,
    total,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = usarCarrito();

  const limpiarTodo = () => {
    if (itemsCarrito.length === 0) {
      toast.info("El carrito ya está vacío");
      return;
    }

    if (window.confirm("¿Seguro que querés vaciar el carrito?")) {
      vaciarCarrito();
      toast.success("Carrito vaciado");
    }
  };

  if (itemsCarrito.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos">
          <button style={{ marginTop: "20px" }}>Ir a productos</button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Carrito de Compras</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
       
        <div style={{ flex: "1 1 650px" }}>
          {itemsCarrito.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "15px",
                background: "rgba(255,255,255,0.06)",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                backdropFilter: "blur(4px)",
              }}
            >
          
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

            
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: "6px" }}>{item.title}</h4>
                <p style={{ fontWeight: "600", margin: "4px 0" }}>
                  ${item.price.toFixed(2)}
                </p>

               
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    style={{ padding: "4px 10px" }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    {item.cantidad}
                  </span>

                  <button
                    onClick={() => aumentarCantidad(item.id)}
                    style={{ padding: "4px 10px" }}
                  >
                    +
                  </button>
                </div>

                
                <button
                  style={{
                    marginTop: "12px",
                    background: "#a33",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    eliminarDelCarrito(item.id);
                    toast.info(`"${item.title}" eliminado del carrito`);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={limpiarTodo}
            style={{
              background: "#b22",
              padding: "10px 18px",
              marginTop: "10px",
            }}
          >
            Vaciar carrito
          </button>
        </div>

        
        <div
          style={{
            flex: "1 1 250px",
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "260px",
            backdropFilter: "blur(5px)",
          }}
        >
          <h3>Resumen</h3>
          <hr
            style={{
              border: "none",
              height: "1px",
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Total: ${total.toFixed(2)}
          </p>

          <Link to="/pago">
            <button style={{ width: "100%", marginTop: "15px" }}>
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
