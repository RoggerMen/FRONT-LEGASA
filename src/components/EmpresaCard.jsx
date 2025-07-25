import "./EmpresaCard.css";

function EmpresaCard({ empresa, color }) {
  const estiloTarjeta = {
  borderLeft: `8px solid ${color}`,
  backgroundColor: color,
  color: "#fff", // texto blanco para contraste
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "8px",
};


  return (
    <div className="empresa-card" style={estiloTarjeta}>
      <h1>{empresa["Razon Social"] || "Nombre no disponible"}</h1>
        <h2>Materias primas:</h2>{" "}
      
        <span>{empresa["Materias Primas"]}</span>
      
    </div>
  );
}

export default EmpresaCard;
