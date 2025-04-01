import React, { useEffect, useState } from 'react'
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";

import DataTable from "react-data-table-component";


function detalles() {
  const [facturas, setFacturas] = useState([]);

  useEffect(()=>{
    const facturasDummy =[
      {InvoiceNumber: "F001", CustomerName: "Juan Pérez", InvoiceDate: "2024-03-30"}
    ];
    setFacturas(facturasDummy)
  },[])

  const[currentPage,setCurrentPage] = useState(1)
  const rowsPerPage = 10;


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = facturas.slice(indexOfFirstRow, indexOfLastRow);

  const columns = [

    {
      name: "Nombre del Cliente",
      selector: (row) => row.InvoiceNumber,
      sortable: true,
      width: "143px",
    },
    {
      name: "Direccion",
      selector: (row) => row.CustomerName,
      sortable: true,
      width: "273px",
    },
    {
      name: "Ciudad",
      selector: (row) => row.InvoiceDate,
      sortable: true,
      width: "163px",
    },
    {
      name: "Telefono",
      selector: (row) => row.InvoiceDate,
      sortable: true,
      width: "163px",
    }
  ]

  const columnas = [

    {
      name: "Número Factura",
      selector: (row) => row.InvoiceNumber,
      sortable: true,
      width: "143px",
    },
    {
      name: "Cliente",
      selector: (row) => row.CustomerName,
      sortable: true,
      width: "273px",
    },
    {
      name: "Fecha Expedición",
      selector: (row) => row.InvoiceDate,
      sortable: true,
      width: "163px",
    },
  ]

  const conditionalRowStyles = [
    {
      when: (row, index) => index % 2 === 0,
      style: {
        backgroundColor: "#f1e1dc !important",
      },
    },
    {
      when: (row, index) => index % 2 !== 0,
      style: {
        backgroundColor: "#dce8f1 !important",
      },
    },
  ];

  console.log("Facturas cargadas:", facturas);
  console.log("Filas actuales:", currentRows);


  return (
    <div>

      <NavBar />
      <MenuFacturas />
      <div className='table-container'>
        <DataTable
          columns={columns} // Usar las columnas definidas
          data={currentRows}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          responsive />
      </div>

      <div className='table-container'>
        <DataTable
          columns={columnas} // Usar las columnas definidas
          data={currentRows}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          responsive />
      </div>

    </div>
  )
}

export default detalles
