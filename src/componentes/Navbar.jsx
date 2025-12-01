import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usarCarrito } from "../contextos/ContexCarrito";

export default function Navbar({ autenticado, setAutenticado }) {
  const { itemsCarrito } = usarCarrito();
  const navigate = useNavigate();
  const cantidad = itemsCarrito.reduce((s, i) => s + i.cantidad, 0);

  const manejarAuth = () => {
    setAutenticado((prev) => {
      const nuevo = !prev;
      if (!nuevo) navigate("/");
      return nuevo;
    });
  };
  
  return (
    <header>
      <div className="head-cont">
        <img 
  src="/img/logoY.png" 
  alt="logo" 
  width="60" 
  onError={(e)=>e.target.style.display='none'} 
/>
        <h1>YUME</h1>
        <div className="carrito-container">
          <Link to="/carrito" className="carrito">
            🛒 <span className="carrito-contador">{cantidad}</span>
          </Link>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/pago">Pago</Link></li>
          <li>
            <button onClick={manejarAuth}>
              {autenticado ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}