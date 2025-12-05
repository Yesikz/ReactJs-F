import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { usarCarrito } from "../contextos/ContexCarrito";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ autenticado, setAutenticado }) {
  const { itemsCarrito } = usarCarrito();
  const totalItems = itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("yume_usuario");
    setAutenticado(false);
    navigate("/");
  };

  return (
    <header>
      <div className="head-cont">
        <img src="/logoY.png" alt="YUME Logo" />

        <h1>YUME</h1>

        <button
          className="menu-hamb"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="carrito-container">
          <Link to="/carrito" className="carrito">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="carrito-contador">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>

      <nav className={menuOpen ? "nav-open" : ""}>
        <ul>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          </li>

          <li>
            <NavLink to="/productos" onClick={() => setMenuOpen(false)}>
              Productos
            </NavLink>
          </li>

          {autenticado ? (
            <>
              <li>
                <NavLink to="/pago" onClick={() => setMenuOpen(false)}>
                  Pago
                </NavLink>
              </li>

              <li>
                <button
                  className="btn-logout"
                  onClick={() => {
                    cerrarSesion();
                    setMenuOpen(false);
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  <FaUser style={{ marginRight: "6px" }} />
                  Iniciar sesión
                </NavLink>
              </li>

              <li>
                <NavLink to="/registro" onClick={() => setMenuOpen(false)}>
                  Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
