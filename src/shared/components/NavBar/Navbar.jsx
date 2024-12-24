import React from 'react'
import './Navbar.css'
import imgConta from '/image/contabilidad.png'
import imgCartera from '/image/Cartera.png'
import imgInformes from '/image/informes.png'
import imgPagos from '/image/pagos.png'
import imgVentas from '/image/ventas.png'
import imgAdministracion from '/image/administracion.png'
import imgTesoreria from '/image/tesoreria.png'
import imgPerfil from '/image/perfil.png'
import imgHome from '/image/home.png'
const Navbar = () => {
  return (
    <>
      <div className='containerOne'>
        <a> <img src={imgHome} className='imagenesLaterales' alt="" /></a>
        <div className='containerTwo'>
        
        <a><img src={imgAdministracion}alt="administracion" /></a>
        <a><img src={imgVentas}alt="ventas" /></a>
        <a><img src={imgTesoreria}alt="tesoreria" /></a>
        <a><img src={imgPagos}alt="pagos"/></a>
        <a><img src={imgConta} alt="contabilidad" /></a>
        <a><img src={imgCartera} alt="cartera" /></a>
        <a><img src={imgInformes} alt="informes" /></a>
        </div>

        <a><img src={imgPerfil} alt="" /></a>

      </div>
    </>

  )
}

export default Navbar