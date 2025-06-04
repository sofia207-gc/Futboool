import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Equipos {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  presidente: string;
}

const ListarEquipo: React.FC = () => {
  const [mensaje, setMensaje] = useState<Equipos[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const navigate = useNavigate();

  const ListarEquipos = async () => {
    const res = await fetch("http://localhost:3333/equipos");
    const msj = await res.json();
    console.log(msj);
    setMensaje(msj.mensaje); 
  };

  const EliminarEquipo = async (id: number) => {
    const seguro = confirm("¿Estás seguro de que quieres eliminar este equipo?");
    if (!seguro) return;

    try {
      const resEl = await fetch(`http://localhost:3333/equipos/${id}`, {
        method: "DELETE",
      });
      if (!resEl.ok) throw new Error("Error al eliminar equipo.");
      await resEl.json();
      ListarEquipos(); // Recargar la lista
    } catch (error) {
      alert("No se pudo eliminar el equipo.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    ListarEquipos();
  }, []);

  const equiposFiltrados = mensaje.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    equipo.presidente.toLowerCase().includes(filtro.toLowerCase()) ||
    equipo.anio_de_fundacion.toString().includes(filtro)
  );

  return (
    <div>
      <Button className="boton-flotante" onClick={() => navigate("/")}>
        + Crear Equipo
      </Button>

      <input
        type="text"
        placeholder="Buscar por nombre, presidente o año"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      <table>
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
              <td>{equipo.presidente}</td>
              <td>{equipo.anio_de_fundacion}</td>
              <td>
                <Button variant="danger" onClick={() => EliminarEquipo(equipo.codigo)}>
                  Eliminar
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/actualizar/${equipo.codigo}`)}>
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarEquipo;
