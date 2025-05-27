import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
interface Equipos{
    codigo:number,
    nombre:string,
    anio_fundacion:number,
    dni_presidente:number
}

const ListarEquipo:React.FC=()=>{
    const [mensaje,setMensaje]=useState<Equipos[]>([]);

    const ListarEquipos= async()=>{
        const res=await fetch('http://localhost:1111/equipo')
        const msj=await res.json()
        console.log(msj)
        setMensaje(msj.mensaje)
    }

    const EliminarEquipo = async (id: number) => {
    const seguro = confirm("¿Estás seguro de que quieres eliminar este equipo?");
    if (!seguro) {
        return;
    }
    const resEl = await fetch(`http://localhost:1111/equipo/${id}`, {
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
                        <th>titulo</th>
                        <th>autor</th>
                        <th>año de publicacion</th>
                        <th>editorial id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mensaje.map((index)=>(
                             <tr>
                                <td>{index.codigo}</td>
                                <td>{index.nombre}</td>
                                <td>{index.anio_fundacion}</td>
                                <td>{index.dni_presidente}</td>
                                <td><Button onClick={()=>EliminarEquipo(index.codigo)}>Eliminar Equipo</Button></td>
                                <td><Button onClick={()=>{}}>Actualizar</Button></td>
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