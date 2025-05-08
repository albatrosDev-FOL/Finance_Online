import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./menuFacturas.css"



const menuFacturas = () => {
  const navegate = useNavigate();
  return (
    <> <div className="containerOne">
      <div className="box">
        <button onClick={() => navegate("/ListadoFacturacion")}>Listado</button>
      </div>
      <div className="box">
        <button onClick={() => navegate("/DetallesFacturacion")}>Detalles</button>
      </div>
      <div className="box">
        <button onClick={() => navegate("/RepresentacionGrafica")}>Representación Grafica </button>
      </div>
    </div>
    </>

  )
}

export default menuFacturas
