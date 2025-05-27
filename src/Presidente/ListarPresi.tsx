import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button } from "react-bootstrap"

interface Presiden{
    dni:number,
    nombre:string
}
const ListarPresi:React.FC=()=>{
     const navigate= useNavigate();
    const [mensaje,setMensaje]=useState<Presiden[]>([])
    const listar= async()=>{
        const res=await fetch('http://localhost:1111/presidentes')
        const msj=await res.json()
        console.log(msj)
        setMensaje(msj.mensaje)
    }
    const Eliminar= async(id:number)=>{
         const seguro = confirm("¿Estás seguro de que quieres eliminar este equipo?");
    if (!seguro) {
        return;
    }
        const respE= await fetch(`http://localhost:1111/presidentes/${id}`,{
            method:'DELETE'
        })
        const msjE=await respE.json()
        console.log(msjE)
        
    }


    const llevarA=(ids:number)=>{
        navigate('/ActualizarEditorial',{state:{ids:ids}})
    }
    useEffect(()=>{
        listar()
    },[])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mensaje.map((index)=>(
                             <tr>
                                <td>{index.dni}</td>
                                <td>{index.nombre}</td>
                                <td><Button onClick={()=>Eliminar(index.dni)}>Eliminar Presidente</Button></td>
                                <td><Button onClick={()=>llevarA(index.dni)}>Actualizar</Button></td>

                            </tr>
                        )
                    )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default ListarPresi;