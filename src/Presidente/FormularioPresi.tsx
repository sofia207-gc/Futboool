import { useState } from "react";
import "./FormularioPresii.css";

const FormularioPresid: React.FC = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");

  const guardarPresi = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página
    const response = await fetch("http://localhost:3333/presidentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni, nombre }),
    });
    console.log(await response.json());
  };

  return (
    <div className="form-container">
      <div className="formularioo">
        <form onSubmit={guardarPresi}>
          <h1>Formulario Presidente</h1>

          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              id="dni"
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioPresid;
