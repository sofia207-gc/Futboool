import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import './FormularioEquii.css'

const FormularioEqui: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [anio_de_fundacion, setAnio_de_fundacion] = useState<string>("0");
  const [dni_del_presidente, setDni_del_presidente] = useState<string>("0");
  const [mensaje, setMensaje] = useState<string>("");
  const [cargando, setCargando] = useState(false);

  const guardarEqui = async () => {
    const anio = parseInt(anio_de_fundacion);
    const dni = parseInt(dni_del_presidente);

    if (!dni) {
      setMensaje("DNI del presidente inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1111/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          anio_de_fundacion: anio,
          dni_del_presidente: dni,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.mensaje || "Ocurrió un error al crear el equipo.");
      } else {
        setMensaje(data.mensaje);

        // Limpiar el formulario si todo sale bien
        setNombre("");
        setAnio_de_fundacion("0");
        setDni_del_presidente("0");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <div className="formulariio">
        <form>
          <h1>FORMULARIO EQUIPO</h1>

          <div className="input-row">
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
                type="number"
                id="anio"
                value={anio_de_fundacion}
                onChange={(e) => setAnio_de_fundacion(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="dni">DNI Presidente</label>
              <input
                type="number"
                id="dni"
                value={dni_del_presidente}
                onChange={(e) => setDni_del_presidente(e.target.value)}
              />
            </div>
          </div>

          <button type="button" onClick={guardarEqui} disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar"}
          </button>
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

export default FormularioEqui;
