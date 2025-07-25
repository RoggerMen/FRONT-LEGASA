import "./CheckBoxList.css";

function CheckboxList({ opciones, seleccionadas, onCambio }) {
  const toggleSeleccion = (materia) => {
    if (seleccionadas.includes(materia)) {
      onCambio(seleccionadas.filter((m) => m !== materia));
    } else {
      onCambio([...seleccionadas, materia]);
    }
  };

  return (
    <div className="checkbox-container">
      <h2>Filtrar por materias primas</h2>
      <div className="checkbox-list">
        {opciones.map((opcion) => (
          <label key={opcion} className="checkbox-item">
            <input
              type="checkbox"
              checked={seleccionadas.includes(opcion)}
              onChange={() => toggleSeleccion(opcion)}
            />
            {opcion}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxList;
