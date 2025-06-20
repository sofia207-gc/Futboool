import React, { useState, useEffect } from 'react';

interface Presidente {
  id: number;
  nombre: string;
  dni: number;
}

const FiltrarPresi: React.FC = () => {
  const [presidentes, setPresidentes] = useState<Presidente[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/presidentes')
      .then((res) => res.json())
      .then((data: Presidente[]) => {
        console.log("Datos recibidos:", data);
        setPresidentes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      });
  }, []);

  const presidentesFiltrados = presidentes.filter((presi) =>
    presi.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    presi.dni.toString().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar por nombre o DNI"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {loading ? (
        <p>Cargando datos...</p>
      ) : presidentesFiltrados.length === 0 ? (
        <p>No se encontraron presidentes con ese filtro.</p>
      ) : (
        <ul>
          {presidentesFiltrados.map((presi) => (
            <li key={presi.id}>
              <strong>{presi.nombre}</strong> - {presi.dni}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltrarPresi;
