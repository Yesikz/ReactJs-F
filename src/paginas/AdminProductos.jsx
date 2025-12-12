import React, { useEffect } from "react";
import { useProducts } from "../contextos/ProductsContext";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AdminProductos() {
  const { productos, cargando, error, borrarProducto, cargarProductos } =
    useProducts();


  useEffect(() => {
    cargarProductos();
  }, []);


  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await borrarProducto(id);
        toast.success("Producto eliminado");
      } catch {
        toast.error("No se pudo eliminar el producto");
      }
    }
  };

  if (cargando) return <h2 className="texto-centrado">Cargando productos...</h2>;

  return (
    <div className="pagina-contenedor">
      <h2 className="titulo-pagina">Gestión de Productos</h2>

      <Link to="/crear-producto">
        <button className="boton">Agregar Producto</button>
      </Link>

      {productos.length === 0 ? (
        <p className="texto-centrado">No hay productos disponibles</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>

                <td className="fila-acciones">
                  <Link className="enlace-accion" to={`/editar-producto/${producto.id}`}>
                    <FaEdit /> Editar
                  </Link>

                  <button
                    className="boton boton-rojo"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
