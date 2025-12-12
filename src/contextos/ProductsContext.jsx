import React, { createContext, useContext, useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../services/productService";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    cargarProductos();
  }, []);


  async function cargarProductos() {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setCargando(false);
    }
  }

  
  async function agregarProducto(nuevoProducto) {
    try {
      const productoCreado = await crearProducto(nuevoProducto);

    
      setProductos((prev) => [...prev, productoCreado]);

      return productoCreado;
    } catch (err) {
      throw new Error("No se pudo crear el producto");
    }
  }

  
  async function actualizarProducto(id, datosActualizados) {
    try {
      const productoEditado = await editarProducto(id, datosActualizados);

      setProductos((prev) =>
        prev.map((p) => (p.id === id ? productoEditado : p))
      );

      return productoEditado;
    } catch (err) {
      throw new Error("No se pudo editar el producto");
    }
  }


  async function borrarProducto(id) {
    try {
      await eliminarProducto(id);

      setProductos((prev) => prev.filter((p) => p.id !== id));

      return true;
    } catch (err) {
      throw new Error("No se pudo eliminar el producto");
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        cargarProductos,
        agregarProducto,
        actualizarProducto,
        borrarProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
