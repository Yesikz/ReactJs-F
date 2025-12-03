import React from "react";
import { Link, NavLink } from "react-router-dom";
import { usarCarrito } from "../contextos/ContexCarrito";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar({ autenticado, setAutenticado }) {
  const { itemsCarrito } = usarCarrito();
  const totalItems = itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header>
      <div className="head-cont">
        <img src="/logoY.png" alt="YUME Logo" />

        <h1>YUME</h1>

        <div className="carrito-container">
          <Link to="/carrito" className="carrito">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="carrito-contador">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/productos">Productos</NavLink>
          </li>

          {autenticado ? (
            <>
              <li>
                <NavLink to="/pago">Pago</NavLink>
              </li>
              <li>
                <button onClick={() => setAutenticado(false)}>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">
                <FaUser style={{ marginRight: "6px" }} />
                Iniciar sesión
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
