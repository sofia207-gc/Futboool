import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ActualizarPresidenteModal from "./ActualizarPresidente";
import "./ListarPresi.css";

interface Presidente {
  dni: number;
  nombre: string;
}

const ListarPresidente: React.FC = () => {
  const [presidentes, setPresidentes] = useState<Presidente[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [presidenteAEditar, setPresidenteAEditar] = useState<Presidente | null>(null);

  const listarPresidentes = async () => {
    try {
      const res = await fetch("http://localhost:1111/presidentes");
      const data = await res.json();
      setPresidentes(data.mensaje);
    } catch (error) {
      console.error("Error al cargar presidentes:", error);
    }
  };

  const eliminarPresidente = async (dni: number) => {
    const confirmado = confirm("¿Estás seguro de que quieres eliminar este presidente?");
    if (!confirmado) return;

    try {
      const res = await fetch(`http://localhost:1111/presidentes/${dni}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar presidente");
      await res.json();
      listarPresidentes();
    } catch (error) {
      alert("No se pudo eliminar el presidente.");
      console.error("Error:", error);
    }
  };

  const actualizarPresidente = async (presidente: Presidente) => {
    try {
      const res = await fetch(`http://localhost:1111/presidentes/${presidente.dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presidente),
      });

      if (!res.ok) throw new Error("Error al actualizar presidente.");
      await res.json();
      alert("Presidente actualizado correctamente.");
      setPresidenteAEditar(null);
      listarPresidentes();
    } catch (error) {
      alert("No se pudo actualizar el presidente.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    listarPresidentes();
  }, []);

  const presidentesFiltrados = presidentes.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.dni.toString().includes(filtro)
  );

  return (
    <div>
      <Button className="boton-flotante" onClick={() => window.location.href = "/FormularioPresi"}>
        + Crear Presidente
      </Button>

      <input
        type="text"
        placeholder="Buscar por DNI o nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {presidentesFiltrados.map((presi) => (
            <tr key={presi.dni}>
              <td>{presi.dni}</td>
              <td>{presi.nombre}</td>
              <td>
                <Button variant="danger" onClick={() => eliminarPresidente(presi.dni)}>
                  Eliminar
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => setPresidenteAEditar(presi)}>
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {presidenteAEditar && (
        <ActualizarPresidenteModal
          presidente={presidenteAEditar}
          onClose={() => setPresidenteAEditar(null)}
          onUpdate={actualizarPresidente}
        />
      )}
    </div>
  );
};

export default ListarPresidente;
