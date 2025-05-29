import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Presidente {
  dni: number;
  nombre: string;
}

interface Equipos{
    codigo:number,
    nombre:string,
    anio_de_fundacion:number,
    
    presidente:string;
}

const ListarEquipo:React.FC=()=>{
    const [mensaje,setMensaje]=useState<Equipos[]>([]);

    const ListarEquipos= async()=>{
        const res=await fetch('http://localhost:3333/equipos')
        const msj=await res.json()
        console.log(msj)
        setMensaje(msj.mensaje)
    }

    const EliminarEquipo = async (id: number) => {
    const seguro = confirm("¿Estás seguro de que quieres eliminar este equipo?");
    if (!seguro) {
        return;
    }
    const resEl = await fetch(`http://localhost:3333/equipos/${id}`, {
        method: 'DELETE'
    });
    const msjEl = await resEl.json();
    console.log(msjEl);
}


    useEffect(()=>{
        ListarEquipos()
    },[])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Presidente</th>
                        <th>año de fundacion</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        mensaje.map((equipo)=>(
                             <tr key={equipo.codigo}>
                                <td>{equipo.codigo}</td>
                                <td>{equipo.nombre}</td>
                                <td>{equipo.presidente}</td>
                                <td>{equipo.anio_de_fundacion}</td>
                                
                                <td><Button variant="danger" onClick={()=>EliminarEquipo(equipo.codigo)}>Eliminar Equipo</Button></td>
                                <td><Button variant="warning" onClick={()=>{}}>Actualizar</Button></td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default ListarEquipo;