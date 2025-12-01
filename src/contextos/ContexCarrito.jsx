import React, { createContext, useContext, useState, useEffect } from "react";

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
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) =>
    setItemsCarrito((prev) => prev.filter((p) => p.id !== id));

  const actualizarCantidad = (id, cantidad) => {
    setItemsCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

  const vaciarCarrito = () => setItemsCarrito([]);

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
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
}