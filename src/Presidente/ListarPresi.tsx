import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ListarPresi.css";

interface Presiden {
  dni: number;
  nombre: string;
}

const ListarPresi: React.FC = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState<Presiden[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const listar = async () => {
    const res = await fetch("http://localhost:1111/presidentes");
    const msj = await res.json();
    console.log(msj);
    setMensaje(msj.mensaje);
  };

  const Eliminar = async (id: number) => {
    const seguro = confirm("¿Estás seguro de que quieres eliminar este presidente?");
    if (!seguro) {
      return;
    }
    const respE = await fetch(`http://localhost:1111/presidentes/${id}`, {
      method: "DELETE",
    });
    const msjE = await respE.json();
    console.log(msjE);
    listar(); // volver a cargar la lista después de eliminar
  };

  const llevarA = (ids: number) => {
    navigate("/ActualizarEditorial", { state: { ids: ids } });
  };

  useEffect(() => {
    listar();
  }, []);

  // Filtrado por nombre o dni
  const mensajeFiltrado = mensaje.filter((presi) =>
    presi.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    presi.dni.toString().includes(filtro)
  );

  return (
    <div>
      <Button className="boton-flotante" onClick={() => navigate("/CrearPresi")}>
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
          {mensajeFiltrado.map((index) => (
            <tr key={index.dni}>
              <td>{index.dni}</td>
              <td>{index.nombre}</td>
              <td>
                <Button variant="danger" onClick={() => Eliminar(index.dni)}>Eliminar</Button>
              </td>
              <td>
                <Button variant="primary" onClick={() => llevarA(index.dni)}>Actualizar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarPresi;
