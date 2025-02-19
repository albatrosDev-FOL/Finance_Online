import React, { useEffect, useState } from "react";;
import NavBar from '../../../shared/components/NavBar/Navbar'
import MenuFacturas from "../menufacturas/menuFacturas";
import DataTable from "react-data-table-component"


import "./listado.css"


const ListadoFacturacion = () => {

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
    },
    {
      NumeroFactura: "F002",
      Cliente: "Jane Doe",
      FechaExpedicion: "02/02/2022"
    },
    {
      NumeroFactura: "F003",
      Cliente: "Michael Doe",
      FechaExpedicion: "03/03/2022"
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
        />
      </div>

    </>
  )
}

export default ListadoFacturacion