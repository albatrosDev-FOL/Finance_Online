import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import DataTable from "react-data-table-component";
import FacturaService from "../../../services/FacturaService";
import "./listado.css";
import FacNavbar from "../../../shared/components/FacNavbar/FacNavbar";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Para español

registerLocale("es", es); // Registrar locale en español

const ListadoFacturacion = () => {
  const [facturas, setFacturas] = useState([]);
  const [queryType, setQueryType] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const rowsPerPage = 10;

  // Cambiamos a tipo Date para los pickers
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [numeroFactura, setNumeroFactura] = useState("");

  useEffect(() => {
    const fetchFacturas = async () => {
      const token = localStorage.getItem("Token");

      // Función para formatear fechas
      const formatDate = (date) => {
        if (!date) return "";
        // Si es un objeto Date, lo formateamos
        if (date instanceof Date) {
          return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
        }
        // Si es un string, lo parseamos primero
        const parsedDate = new Date(date);
        return parsedDate.toISOString().split("T")[0];
      };

      const data = {
        FinalDate:
          selectedOption === "rangoFecha" || selectedOption === "tiquete"
            ? formatDate(fechaFin)
            : "",
        InitialDate:
          selectedOption === "rangoFecha" || selectedOption === "tiquete"
            ? formatDate(fechaInicio)
            : "",
        Invoicenumber: selectedOption === "numeroFactura" ? numeroFactura : "",
        Querytype: queryType,
        ThirdPartyId: 1,
        Travelagyid: localStorage.getItem("SucursalId"),
      };

      try {
        const response = await FacturaService.postListarFactura(data, token);
        if (response && response.InvoiceResult) {
          setFacturas(response.InvoiceResult);
        } else {
          setFacturas([]);
        }
      } catch (error) {
        console.error("Error al obtener facturas:", error);
        setFacturas([]);
      }
    };

    fetchFacturas();
  }, [queryType, numeroFactura, fechaInicio, fechaFin, selectedOption]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Asignar el Querytype correspondiente
    switch (value) {
      case "ultimas10":
        setQueryType(1);
        break;
      case "rangoFecha":
        setQueryType(2);
        break;
      case "numeroFactura":
        setQueryType(3);
        break;
      case "tiquete":
        setQueryType(4);
        break;
      default:
        setQueryType(1);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = facturas.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // Definir las columnas para la tabla
  const columns = [
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
    {
      name: "Vencimiento",
      selector: (row) => row.InvoiceDateExp,
      sortable: true,
      width: "163px",
    },
    {
      name: "Moneda",
      selector: (row) => row.Coin,
      sortable: true,
      width: "100px",
    },
    {
      name: "Valor",
      selector: (row) => row.TotalValue,
      sortable: true,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row) => row.State,
      sortable: true,
      width: "100px",
    },
    {
      name: "Sucursal",
      selector: (row) => localStorage.getItem("Agencia"),
      sortable: true,
      width: "273px",
    },
    {
      name: "Tipo",
      selector: (row) => row.Type,
      sortable: true,
      width: "100px",
    },
  ];

  // Estilos condicionales para las filas
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

  // Contenido del modal para ListadoFacturacion
  const cuerpoModal = (
    <Form>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Últimas 10 facturas"
          value="ultimas10"
          checked={selectedOption === "ultimas10"}
          onChange={handleOptionChange}
        />
        <Form.Check
          type="radio"
          label="Rango de fecha"
          value="rangoFecha"
          checked={selectedOption === "rangoFecha"}
          onChange={handleOptionChange}
        />
        {selectedOption === "rangoFecha" && (
          <div className="mt-3">
            <div className="mb-3 d-flex align-items-center">
              <Form.Label className="me-2" style={{ minWidth: "100px" }}>
                Fecha Inicio:
              </Form.Label>
              <DatePicker
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
                selectsStart
                startDate={fechaInicio}
                endDate={fechaFin}
                locale="es"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Seleccione fecha inicio"
                isClearable
              />
            </div>
            <div className="d-flex align-items-center">
              <Form.Label className="me-2" style={{ minWidth: "100px" }}>
                Fecha Fin:
              </Form.Label>
              <DatePicker
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                selectsEnd
                startDate={fechaInicio}
                endDate={fechaFin}
                minDate={fechaInicio}
                locale="es"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Seleccione fecha fin"
                isClearable
              />
            </div>
          </div>
        )}
        <Form.Check
          type="radio"
          label="Número de factura"
          value="numeroFactura"
          checked={selectedOption === "numeroFactura"}
          onChange={handleOptionChange}
        />
        {selectedOption === "numeroFactura" && (
          <div className="mt-3 d-flex align-items-center">
            <Form.Label className="me-2">Número:</Form.Label>
            <Form.Control
              type="text"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              className="me-3"
              placeholder="Ingrese número de factura"
            />
          </div>
        )}
      </Form.Group>
    </Form>
  );

  return (
    <>
      <NavBar />
      <MenuFacturas />
      <FacNavbar cuerpoModal={cuerpoModal} />

      <div className="table-container">
        <DataTable
          columns={columns} // Usar las columnas definidas
          data={currentRows}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          responsive
        />

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
