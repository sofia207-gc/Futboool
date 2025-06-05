import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ActualizarEquipoModal from "./ActualizarEquipo";


interface Equipos {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  dni_del_presidente: string;
}

const ListarEquipo: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [equipoAEditar, setEquipoAEditar] = useState<Equipos | null>(null);

  const ListarEquipos = async () => {
    try {
      const res = await fetch("http://localhost:1111/equipos");
      const data = await res.json();
      setEquipos(data.mensaje);
    } catch (error) {
      console.error("Error al listar equipos:", error);
    }
  };

  const EliminarEquipo = async (id: number) => {
    const seguro = confirm("¿Estás seguro de que quieres eliminar este equipo?");
    if (!seguro) return;

    try {
      const res = await fetch(`http://localhost:1111/equipos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar equipo.");
      await res.json();
      ListarEquipos();
    } catch (error) {
      alert("No se pudo eliminar el equipo.");
      console.error("Error:", error);
    }
  };

  const actualizarEquipo = async (equipo: Equipos) => {
    try {
      const res = await fetch(`http://localhost:1111/equipos/${equipo.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipo),
      });

      if (!res.ok) throw new Error("Error al actualizar equipo.");
      await res.json();
      alert("Equipo actualizado correctamente.");
      setEquipoAEditar(null);
      ListarEquipos();
    } catch (error) {
      alert("No se pudo actualizar el equipo.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    ListarEquipos();
  }, []);

 const equiposFiltrados = equipos.filter((equipo) =>
  equipo.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
  equipo.dni_del_presidente.toString().toLowerCase().includes(filtro.toLowerCase()) ||
  equipo.anio_de_fundacion.toString().includes(filtro)
);


  return (
    <div className="container my-4">
      <Button className="boton-flotante" onClick={() => window.location.href = "/"}>
        + Crear Equipo
      </Button>

      <input
        type="text"
        placeholder="Buscar por nombre, presidente o año"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Presidente</th>
            <th>Año de Fundación</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equiposFiltrados.map((equipo) => (
            <tr key={equipo.codigo}>
              <td>{equipo.codigo}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.dni_del_presidente}</td>
              <td>{equipo.anio_de_fundacion}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => EliminarEquipo(equipo.codigo)}
                >
                  Eliminar
                </Button>
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => setEquipoAEditar(equipo)}
                >
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {equipoAEditar && (
        <ActualizarEquipoModal
          equipo={equipoAEditar}
          onClose={() => setEquipoAEditar(null)}
          onUpdate={actualizarEquipo}
        />
      )}
    </div>
  );
};

export default ListarEquipo;

