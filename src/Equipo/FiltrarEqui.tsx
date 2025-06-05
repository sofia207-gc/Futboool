import { useEffect, useState } from "react";
import "./FormularioEquii.css";


interface Equipo {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  dni_del_presidente: string;
}

const FiltrarEquipo: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch('http://localhost:1111/presidentes')
        .then((res) => res.json()) 
        .then((data: Equipo[]) => {
          setEquipos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar los datos:', error);
          setLoading(false);
        });
    }, []);

 


  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(filtro) ||
    equipo.dni_del_presidente.toLowerCase().includes(filtro) ||
    equipo.anio_de_fundacion.toString().includes(filtro) ||
    equipo.codigo.toString().includes(filtro)
  );

  return (
    <div>
      <input type="text" placeholder="Buscar"
      value={filtro}
      onChange={(equi) => setFiltro (equi.target.value)}
      className="border p-2 mb-4 w-full"
       />

  {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {equiposFiltrados.map((equi) => (
            <li key={equi.nombre}>
              <strong>{equi.anio_de_fundacion}</strong> - {equi.dni_del_presidente}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltrarEquipo;
