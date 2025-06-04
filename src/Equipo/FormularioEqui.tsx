import { useState } from "react";
import "./FormularioEquii.css";

const FormularioEqui: React.FC = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [anio_fundacion, setAnioFundacion] = useState("");

  const guardarEqui = async () => {
    // Validación básica
    if (!codigo || !nombre || !anio_fundacion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, nombre, anio_fundacion }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      alert("Equipo guardado correctamente");

      // Opcional: limpiar los campos
      setCodigo("");
      setNombre("");
      setAnioFundacion("");
    } catch (error) {
      console.error("Error al guardar el equipo:", error);
      alert("Ocurrió un error al guardar el equipo.");
    }
  };

  return (
    <div className="form-container">
      <div className="formulario">
        <form>
          <h1>FORMULARIO EQUIPO</h1>
          <h4>Registrar Datos</h4>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="codigo">Código</label>
              <input
                type="text"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="anio">Año de Fundación</label>
              <input
                type="text"
                id="anio"
                value={anio_fundacion}
                onChange={(e) => setAnioFundacion(e.target.value)}
              />
            </div>
          </div>

          <button type="button" onClick={guardarEqui}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioEqui;
