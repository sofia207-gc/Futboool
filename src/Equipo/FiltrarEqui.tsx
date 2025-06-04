import { useEffect, useState } from "react";

interface Equipo {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  presidente: string;
}

const FiltrarEquipo: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  // Cargar equipos desde backend
  const cargarEquipos = async () => {
    const res = await fetch("http://localhost:3333/equipos");
    const data = await res.json();
    setEquipos(data.mensaje);
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  const equiposFiltrados = equipos.filter(
    (equipo) =>
      equipo.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      equipo.presidente.toLowerCase().includes(filtro.toLowerCase()) ||
      equipo.anio_de_fundacion.toString().includes(filtro) ||
      equipo.codigo.toString().includes(filtro)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre, presidente, año o código"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Presidente</th>
            <th>Año de Fundación</th>
          </tr>
        </thead>
        <tbody>
          {equiposFiltrados.map((equipo) => (
            <tr key={equipo.codigo}>
              <td>{equipo.codigo}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.presidente}</td>
              <td>{equipo.anio_de_fundacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FiltrarEquipo;
