import { useState } from "react";
import "./FormularioPresii.css";
import { Alert } from "react-bootstrap";

const FormularioPresid: React.FC = () => {
  const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState<string>('');

  const guardarPresi = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página
    const response = await fetch("http://localhost:1111/presidentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nombre }),
    });
    const msj = await response.json();
        setMensaje(msj.mensaje);
  };

  return (
    <div className="form-container">
      <div className="formularioo">
        <form onSubmit={guardarPresi}>
          <h1>Formulario Presidente</h1>

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
        {mensaje && (
                    <Alert variant="info" className="mt-3 text-center">
                        {mensaje}
                    </Alert>
                )}
      </div>
    </div>
  );
};

export default FormularioPresid;
