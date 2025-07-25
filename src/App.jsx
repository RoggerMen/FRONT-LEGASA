import { useState, useEffect } from "react";
import axios from "axios";
import CheckboxList from "./components/CheckboxList";
import EmpresaCard from "./components/EmpresaCard";
import "./App.css";

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState(0); // <-- NUEVO

  // Obtener el total sin filtros
  const obtenerTotalEmpresas = async () => {
    try {
      const res = await axios.get("https://api-legasa-qu9e.vercel.app/api/empresas");
      setTotalEmpresas(res.data.length);
    } catch (err) {
      console.error("Error al cargar el total de empresas:", err);
    }
  };

  // Obtener empresas filtradas (o todas si no hay filtros)
  const obtenerEmpresas = async () => {
    try {
      let url = "https://api-legasa-qu9e.vercel.app/api/empresas";
      if (materiasSeleccionadas.length > 0) {
        const query = materiasSeleccionadas.join(",");
        url = `https://api-legasa-qu9e.vercel.app/api/empresas/filtrar?materias=${query}`;
      }

      const res = await axios.get(url);
      setEmpresas(res.data);
    } catch (err) {
      console.error("Error al cargar empresas:", err);
    }
  };

  useEffect(() => {
    obtenerTotalEmpresas(); // una vez al inicio
    obtenerEmpresas(); // cada vez que cambie el filtro
  }, [materiasSeleccionadas]);

  const colorPorEmpresa = {};
  const generarColorDesdeTexto = (texto) => {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
      hash = texto.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 55%, 76%)`; // colores pastel distinguibles
  };

  const asignarColor = (nombreEmpresa) => {
    if (!colorPorEmpresa[nombreEmpresa]) {
      colorPorEmpresa[nombreEmpresa] = generarColorDesdeTexto(nombreEmpresa);
    }
    return colorPorEmpresa[nombreEmpresa];
  };

  return (
    <div className="container">
      <header className="app-header">
        <img src="/logo-legasa.jpg" alt="Logo izquierda" className="logo-lado" />
        <div className="titulo-centro">
          <h1>LEGASA</h1>
        </div>
        <img src="/logo-legasa.jpg" alt="Logo derecha" className="logo-lado" />
      </header>

      <CheckboxList
        opciones={["trigo", "avena", "maíz", "soya", "cañihua", "cebada", "harina", "quinua", "anis", "harinas", "harinas extruida", "harina extruidas"]}
        seleccionadas={materiasSeleccionadas}
        onCambio={setMateriasSeleccionadas}
      />

      
      <div style={{ margin: "20px 0", fontWeight: "bold", fontSize: "1.8rem" }}>
        {materiasSeleccionadas.length === 0
          ? `Total de empresas: ${totalEmpresas}`
          : `Empresas que cumplen el filtro: ${empresas.length} de ${totalEmpresas}`}
      </div>

      <div className="empresa-flex">
        {empresas.map((empresa, index) => {
          const nombre = empresa["Razon Social"] || "Desconocida";
          const color = asignarColor(nombre);
          return <EmpresaCard key={index} empresa={empresa} color={color} />;
        })}
      </div>
    </div>
  );
}

export default App;
