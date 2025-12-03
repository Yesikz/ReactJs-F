import React, { useEffect, useMemo, useState } from "react";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { PRODUCTOS_ENDPOINT, API_BASE } from "../api";
import { toast } from "react-toastify";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [debouncedBusqueda, setDebouncedBusqueda] = useState("");

  const [categoria, setCategoria] = useState("all");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [orden, setOrden] = useState("default");

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);

  
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedBusqueda(busqueda.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(t);
  }, [busqueda]);


  useEffect(() => {
    Promise.all([
      fetch(PRODUCTOS_ENDPOINT).then((r) => r.json()),
      fetch(`${API_BASE}/products/categories`).then((r) => r.json()),
    ])
      .then(([p, c]) => {
        setProductos(p);
        setCategorias(c);
      })
      .catch(() => {
        toast.error("Error cargando productos");
        setError(true);
      })
      .finally(() => setCargando(false));
  }, []);

 
  const productosFiltrados = useMemo(() => {
    let list = [...productos];

    if (debouncedBusqueda) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(debouncedBusqueda) ||
          p.category.toLowerCase().includes(debouncedBusqueda)
      );
    }

    if (categoria !== "all") {
      list = list.filter((p) => p.category === categoria);
    }

    const min = parseFloat(precioMin);
    const max = parseFloat(precioMax);

    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);

    if (orden === "price-asc") list.sort((a, b) => a.price - b.price);
    if (orden === "price-desc") list.sort((a, b) => b.price - a.price);
    if (orden === "title-asc") list.sort((a, b) => a.title.localeCompare(b.title));
    if (orden === "title-desc") list.sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [productos, debouncedBusqueda, categoria, precioMin, precioMax, orden]);

  const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / porPagina));

  const inicio = (pagina - 1) * porPagina;
  const productosPagina = productosFiltrados.slice(inicio, inicio + porPagina);

  const limpiarFiltros = () => {
    setBusqueda("");
    setDebouncedBusqueda("");
    setCategoria("all");
    setPrecioMin("");
    setPrecioMax("");
    setOrden("default");
    setPagina(1);
  };

  if (cargando) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Error cargando datos</p>;
  }

  return (
    <div className="container" style={{ marginBottom: "80px" }}>
      <h2>Productos</h2>

     
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          backdropFilter: "blur(5px)",
        }}
      >
       
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              width: "60%",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />
        </div>

      
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ padding: "8px", borderRadius: "8px", background: "#3a3630", color: "#fff" }}
          >
            <option value="all">Todas</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            style={{ padding: "8px", borderRadius: "8px", width: "90px" }}
          />

          <input
            type="number"
            placeholder="Max"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            style={{ padding: "8px", borderRadius: "8px", width: "90px" }}
          />

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            style={{ padding: "8px", borderRadius: "8px", background: "#3a3630", color: "#fff" }}
          >
            <option value="default">Ordenar</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
            <option value="title-asc">A - Z</option>
            <option value="title-desc">Z - A</option>
          </select>

          <button onClick={limpiarFiltros}>Limpiar</button>
        </div>

       
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <label>Por página: </label>
          <select
            value={porPagina}
            onChange={(e) => setPorPagina(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "6px", borderRadius: "8px" }}
          >
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

     
      {productosFiltrados.length === 0 ? (
        <p style={{ textAlign: "center" }}>No se encontraron productos.</p>
      ) : (
        <>
          <div className="contenedor">
            {productosPagina.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>

         
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
              ◀
            </button>

            <span style={{ margin: "0 12px" }}>
              Página {pagina} de {totalPaginas}
            </span>

            <button
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
