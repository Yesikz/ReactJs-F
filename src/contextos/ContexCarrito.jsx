import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContextoCarrito = createContext();

export function usarCarrito() {
  return useContext(ContextoCarrito);
}

export function ProveedorCarrito({ children }) {
  const [itemsCarrito, setItemsCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("yume_carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("yume_carrito", JSON.stringify(itemsCarrito));
  }, [itemsCarrito]);

 
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setItemsCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id);

      if (existente) {
        toast.success(`Se actualizó la cantidad de ${producto.title}`);
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      }

      toast.success(`${producto.title} agregado al carrito`);
      return [...prev, { ...producto, cantidad }];
    });
  };


  const eliminarDelCarrito = (id) => {
    const producto = itemsCarrito.find((p) => p.id === id);
    toast.info(`${producto?.title || "Producto"} eliminado del carrito`);
    setItemsCarrito((prev) => prev.filter((p) => p.id !== id));
  };


  const actualizarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    setItemsCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

  const aumentarCantidad = (id) => {
    setItemsCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };


  const disminuirCantidad = (id) => {
    setItemsCarrito((prev) =>
      prev.map((p) =>
        p.id === id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
    );
  };


  const vaciarCarrito = () => {
    toast.info("Carrito vaciado");
    setItemsCarrito([]);
  };

 
  const total = itemsCarrito.reduce(
    (suma, p) => suma + p.price * p.cantidad,
    0
  );

  return (
    <ContextoCarrito.Provider
      value={{
        itemsCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
}
