import { useState } from "react";
import "./FormularioPresii.css";

const FormularioPresid: React.FC = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");

  const guardarPresi = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página

    // Validación básica
    if (!dni || !nombre) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/presidentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, nombre }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      alert("Presidente guardado correctamente");

      // Limpia los campos
      setDni("");
      setNombre("");
    } catch (error) {
      console.error("Error al guardar presidente:", error);
      alert("Ocurrió un error al guardar el presidente.");
    }
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
