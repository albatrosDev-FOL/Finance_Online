import React from 'react'
import "./menuFacturas.css"


const menuFacturas = () => {
    
  return (
   
    <div className="containerOne">
      <div className="box">
        <button>Listado</button>
      </div>
      <div className="box">
        <button>Detalles</button>
      </div>
      <div className="box">
        <button>Representación</button> 
      </div>
      <div className="box">
        <button>Grafica</button>
      </div>
    </div>
  )
}

export default menuFacturas
