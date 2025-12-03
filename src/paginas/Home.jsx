import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home"> 
      <h2>Bienvenida a YUME</h2>
      <p>
        Donde la moda y los sueños se encuentran. <br /> 
        En YUME creemos que cada detalle cuenta: br la textura de una tela, el brillo de una joya, la historia que acompaña cada diseño. <br /> Nuestra colección fue creada para que expreses tu estilo con autenticidad, elegancia y un toque de inspiración. <br /> <br />Descubrí el arte de vestir tus sueños. ✨
      </p>
      <button className="btn-1" onClick={() => navigate("/productos")}>
        Explorar productos
      </button>
    </section>

  );
}