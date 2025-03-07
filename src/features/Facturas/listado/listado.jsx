import React, { useEffect, useState } from "react";;
import NavBar from '../../../shared/components/NavBar/Navbar'
import MenuFacturas from "../menufacturas/menuFacturas";
import DataTable from "react-data-table-component"


import "./listado.css"


const ListadoFacturacion = () => {

  useEffect(() => {
    
  })

  const colums = [
    {
      name: <div>Numero Factura</div>

    },
    {
      name:
        "Cliente"
    },
    {
      name:
        "FechaExpedicion"
    },
    {
      name:
        "Moneda"
    },
    {
      name:
        "Valor"
    },
    {
      name:
        "Estado"
    },
    {
      name:
        "Tipo"
    },
    {
      name:
        "Id"
    },
  ]
  const data = [
    {
      NumeroFactura: "F001",
      Cliente: "John Doe",
      FechaExpedicion: "01/01/2022"
    }
  ]
  return (
    <>
      <NavBar />
      <MenuFacturas />

      <div>
        <DataTable
          columns={colums}
          data={data} 
          className="custom-table"
          style={{ backgroundColor: "rgba(224, 241, 255, 0.61)" }}

        />
      </div>

    </>
  )
}

export default ListadoFacturacion