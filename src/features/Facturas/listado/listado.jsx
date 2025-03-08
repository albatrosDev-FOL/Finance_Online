import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import DataTable from "react-data-table-component";
import FacturaService from "../../../services/FacturaService";
import "./listado.css";

const ListadoFacturacion = () => {
  const [facturas, setFacturas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const rowsPerPage = 5; // Número de filas por página

  useEffect(() => {
    const fetchFacturas = async () => {
      const token = localStorage.getItem("Token");
      const data = {
        FinalDate: "2025-02-26T01:11:27.777Z",
        InitialDate: "2024-02-26T01:11:27.777Z",
        Invoicenumber: "CT113333",
        Querytype: 1,
        ThirdPartyId: 1,
        Travelagyid: localStorage.getItem("SucursalId"),
      };
      try {
        const response = await FacturaService.postListarFactura(data, token);
        console.log(response);
        setFacturas(response.InvoiceResult); // Actualiza el estado con los datos de la API
      } catch (error) {
        console.error("Error al obtener facturas:", error);
      }
    };

    fetchFacturas();
  }, []); // <-- Array de dependencias vacío

  // Calcula las filas que se mostrarán en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = facturas.slice(indexOfFirstRow, indexOfLastRow);

  // Maneja el cambio de página
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      name: "Número Factura",
      selector: (row) => row.InvoiceNumber, // Mapea a InvoiceNumber
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.CustomerName, // Mapea a CustomerName
      sortable: true,
    },
    {
      name: "Fecha Expedición",
      selector: (row) => row.InvoiceDate, // Mapea a InvoiceDate Expedicion
      sortable: true,
    },
    {
      name: "Vencimiento",
      selector: (row) => row.InvoiceDateExp, // Mapea a InvoiceDateExp Vencimiento
      sortable: true,
    },
    {
      name: "Moneda",
      selector: (row) => row.Coin, // Mapea a Coin
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row) => row.TotalValue, // Mapea a TotalValue
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.State, // Mapea a State
      sortable: true,
    },
    {
      name: "Sucursal",
      selector: (row) => localStorage.getItem("Agencia"),
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row) => row.Type, // Mapea a Type
      sortable: true,
    },
  ];

  return (
    <>
      <NavBar />
      <MenuFacturas />

      <div className="table-container">
        <DataTable
          columns={columns} // Columnas definidas
          // data={facturas} // Datos de las facturas
          data={currentRows}
          className="custom-table"
          style={{ backgroundColor: "rgba(224, 241, 255, 0.61)" }}
          responsive // Habilita la responsividad
          // pagination // Habilita la paginación
          // highlightOnHover // Resalta las filas al pasar el mouse
          // striped // Alterna colores en las filas
        />
        {/* Paginador de Material-UI */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(facturas.length / rowsPerPage)} 
            page={currentPage} 
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default ListadoFacturacion;
