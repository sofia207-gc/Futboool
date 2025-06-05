import React, { useState, useEffect } from "react";

interface Presidente {
  dni: number;
  nombre: string;
}

interface Props {
  presidente: Presidente;
  onClose: () => void;
  onUpdate: (presidente: Presidente) => void;
}

const ActualizarPresidenteModal: React.FC<Props> = ({ presidente, onClose, onUpdate }) => {
  const [presidenteEditable, setPresidenteEditable] = useState<Presidente>(presidente);

  useEffect(() => {
    setPresidenteEditable(presidente);
  }, [presidente]);

  const handleGuardar = () => {
    const seguro = confirm("¿Estás seguro de que quieres actualizar este presidente?");
    if (!seguro) return;
    onUpdate(presidenteEditable);
  };

  return (
    <div className="modal-overlay" style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div className="modal" style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", width: "300px" }}>
        <h4>Actualizar Presidente</h4>

        <input
          type="text"
          placeholder="Nombre"
          value={presidenteEditable.nombre}
          onChange={(e) =>
            setPresidenteEditable({ ...presidenteEditable, nombre: e.target.value })
          }
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <input
          type="number"
          placeholder="DNI"
          value={presidenteEditable.dni}
          onChange={(e) =>
            setPresidenteEditable({
              ...presidenteEditable,
              dni: parseInt(e.target.value) || 0,
            })
          }
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleGuardar} style={{ marginRight: "0.5rem" }}>Guardar</button>
          <button onClick={onClose} style={{ backgroundColor: "#ccc", color: "#333" }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPresidenteModal;

