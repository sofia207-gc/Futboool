import { useState } from "react";
import "./FormularioEquii.css";

const FormularioEqui: React.FC = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [anio_fundacion, setAnioFundacion] = useState("");

  const guardarEqui = async () => {
    const response = await fetch("http://localhost:3333/equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo, nombre, anio_fundacion }),
    });
    console.log(await response.json());
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
