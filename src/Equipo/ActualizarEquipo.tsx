import React, { useState, useEffect } from "react";

interface Equipos {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  presidente: string;
}

interface Props {
  equipo: Equipos;
  onClose: () => void;
  onUpdate: (equipo: Equipos) => void;
}

const ActualizarEquipoModal: React.FC<Props> = ({ equipo, onClose, onUpdate }) => {
  const [equipoEditable, setEquipoEditable] = useState<Equipos>(equipo);

  useEffect(() => {
    setEquipoEditable(equipo);
  }, [equipo]);

  const handleGuardar = () => {
    const seguro = confirm("¿Estás seguro de que quieres actualizar este equipo?");
    if (!seguro) return;
    onUpdate(equipoEditable);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal"
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          width: "320px",
        }}
      >
        <h4>Actualizar Equipo</h4>

        <input
          type="text"
          placeholder="Nombre"
          value={equipoEditable.nombre}
          onChange={(e) =>
            setEquipoEditable({ ...equipoEditable, nombre: e.target.value })
          }
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <input
          type="text"
          placeholder="Presidente"
          value={equipoEditable.presidente}
          onChange={(e) =>
            setEquipoEditable({ ...equipoEditable, presidente: e.target.value })
          }
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <input
          type="number"
          placeholder="Año de Fundación"
          value={equipoEditable.anio_de_fundacion}
          onChange={(e) =>
            setEquipoEditable({
              ...equipoEditable,
              anio_de_fundacion: parseInt(e.target.value) || 0,
            })
          }
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleGuardar} style={{ marginRight: "0.5rem" }}>
            Guardar
          </button>
          <button
            onClick={onClose}
            style={{ backgroundColor: "#ccc", color: "#333" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarEquipoModal;
