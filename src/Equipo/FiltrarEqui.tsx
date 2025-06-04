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
  const [loading, setLoading] = useState(true);

  const cargarEquipos = async () => {
    try {
      const res = await fetch("http://localhost:3333/equipos");
      const data = await res.json();
      console.log("Datos recibidos:", data); 

        // Verifica si se han recibido datos
      const equiposData = Array.isArray(data) ? data : data.mensaje;
      setEquipos(equiposData);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    } finally {
      setLoading(false);
    }
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
    <div className="p-4">
      <input
        type="text"
        placeholder="Filtrar por nombre, presidente, año o código"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      {loading ? (
        <p>Cargando equipos...</p>
      ) : equiposFiltrados.length === 0 ? (
        <p>No se encontraron equipos con ese filtro.</p>
      ) : (
        <table className="table table-bordered table-striped">
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
      )}
    </div>
  );
};

export default FiltrarEquipo;
