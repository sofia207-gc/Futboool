import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ListarPresi.css";

interface Presidente {
  dni: number;
  nombre: string;
}

const ListarPresi: React.FC = () => {
  const navigate = useNavigate();
  const [presidentes, setPresidentes] = useState<Presidente[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  // Cargar lista de presidentes
  const listarPresidentes = async () => {
    try {
      const res = await fetch("http://localhost:1111/presidentes");
      const data = await res.json();
      console.log(data);
      setPresidentes(data.mensaje); // Ajusta según tu backend
    } catch (error) {
      console.error("Error al cargar presidentes:", error);
    }
  };

  // Eliminar presidente
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
      console.error(error);
    }
  };


  const irActualizar = (dni: number) => {
    navigate(`/actualizarPresidente/${dni}`);
  };

  useEffect(() => {
    listarPresidentes();
  }, []);

  const presidentesFiltrados = presidentes.filter(
    (p) =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      p.dni.toString().includes(filtro)
  );

  return (
    <div>
      <Button className="boton-flotante" onClick={() => navigate("/crearPresidente")}>
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
                <Button variant="primary" onClick={() => irActualizar(presi.dni)}>
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

export default ListarPresi;

