import React from 'react'
import "./Sucursales.css"
import img1 from '../../assets/image/sucursales.jpg';
import MenuDes from "../Sucursales/Menu/MenuDes"
import Buttom from '../login/Buttom/Buttom';
   const Sucursales = () => {
    return (
        <section className='containerS'>
            <form className='contaninerF'>
            <img src={img1} className='SucursalImg'/>
            <h2> Sucursales</h2>
           <MenuDes>Seleccionar uno</MenuDes> 
           <Buttom>Entrar</Buttom>

            </form>
        </section>

    )

   } 
export default Sucursales
