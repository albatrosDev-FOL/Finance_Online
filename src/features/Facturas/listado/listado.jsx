import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import DataTable from "react-data-table-component";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import FacturaService from "../../../services/FacturaService";
import FacNavbar from "../../../shared/components/FacNavbar/FacNavbar";
import ButtonDetails from "../../../shared/components/ButtonDetails/ButtonDetails";
import ProductosAereos from "../../../shared/components/Productos Aereos/productosAereos"
import "./listado.css";

registerLocale("es", es);

const ListadoFacturacion = () => {
  // CONSTANTES
  const ROWS_PER_PAGE = 10;
  const QUERY_TYPES = {
    ULTIMAS_10: 1,
    RANGO_FECHA: 2,
    NUMERO_FACTURA: 3,
    TIQUETE: 4
  };

  // ESTADOS PRINCIPALES
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryType, setQueryType] = useState(QUERY_TYPES.ULTIMAS_10);
  const [searchOption, setSearchOption] = useState("ultimas10");

  // FILTROS DE BÚSQUEDA
  const [searchFilters, setSearchFilters] = useState({
    startDate: null,
    endDate: null,
    invoiceNumber: "",
    customerId: ""
  });

  // ESTADOS PARA EL MODAL DE CLIENTES
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerSearchOption, setCustomerSearchOption] = useState("mostrar_todos");
  const [customerSearchValue, setCustomerSearchValue] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  // Obtener datos iniciales de facturas
  useEffect(() => {
    fetchInvoices();
  }, [queryType, searchFilters]);

  // Obtener lista de clientes al montar el componente
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filtrar clientes cuando cambian los criterios de búsqueda
  useEffect(() => {
    filterCustomers();
  }, [customerSearchValue, customerSearchOption, customers]);

  // FUNCIONES PARA MANEJAR FACTURAS
  const fetchInvoices = async () => {
    const token = localStorage.getItem("Token");
    const branchId = localStorage.getItem("SucursalId");

    const requestData = {
      FinalDate: formatDate(searchFilters.endDate),
      InitialDate: formatDate(searchFilters.startDate),
      Invoicenumber: searchFilters.invoiceNumber,
      Querytype: queryType,
      ThirdPartyId: 1,
      Travelagyid: branchId,
    };

    try {
      const response = await FacturaService.postListarFactura(requestData, token);
      setInvoices(response?.InvoiceResult || []);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
      setInvoices([]);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  // FUNCIONES PARA MANEJAR CLIENTES
  const fetchCustomers = async () => {
    const token = localStorage.getItem("Token");
    const branchId = localStorage.getItem("SucursalId");

    try {
      const response = await FacturaService.getDetalles(branchId, token, {});

      if (response?.CustomerList) {
        const customersData = response.CustomerList.map(customer => ({
          documentNumber: customer.DocumentNumber,
          firstName: customer.FirstName,
          lastName: customer.LastName,
          rawData: customer,
        }));

        setCustomers(customersData);
        setFilteredCustomers(customersData);
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      setCustomers([]);
      setFilteredCustomers([]);
    }
  };

  const filterCustomers = () => {
    if (customerSearchOption === "mostrar_todos") {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(customer => {
      const searchTerm = customerSearchValue.toLowerCase();

      switch (customerSearchOption) {
        case "identificacion":
          return customer.documentNumber.toLowerCase().includes(searchTerm);
        case "nombre":
          return customer.firstName.toLowerCase().includes(searchTerm);
        case "apellido":
          return customer.lastName.toLowerCase().includes(searchTerm);
        default:
          return true;
      }
    });

    setFilteredCustomers(filtered);
  };

  // MANEJADORES DE EVENTOS
  const handleSearchOptionChange = (e) => {
    const option = e.target.value;
    setSearchOption(option);

    switch (option) {
      case "ultimas10":
        setQueryType(QUERY_TYPES.ULTIMAS_10);
        break;
      case "rangoFecha":
        setQueryType(QUERY_TYPES.RANGO_FECHA);
        break;
      case "numeroFactura":
        setQueryType(QUERY_TYPES.NUMERO_FACTURA);
        break;
      case "tiquete":
        setQueryType(QUERY_TYPES.TIQUETE);
        break;
      default:
        setQueryType(QUERY_TYPES.ULTIMAS_10);
    }

    // Resetear filtros cuando cambia la opción
    setSearchFilters({
      startDate: null,
      endDate: null,
      invoiceNumber: "",
      customerId: ""
    });
  };

  const handleCustomerSearchOptionChange = (e) => {
    setCustomerSearchOption(e.target.value);
    setCustomerSearchValue("");
  };

  const handleClearCustomerFilters = () => {
    setCustomerSearchOption("mostrar_todos");
    setCustomerSearchValue("");
    setShowCustomerModal(false);
  };


  // PAGINACIÓN
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const currentInvoices = invoices.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // DEFINICIÓN DE COLUMNAS
  const invoiceColumns = [
    {
      name: "Número Factura",
      selector: row => row.InvoiceNumber,
      sortable: true,
      width: "143px",
    },
    {
      name: "Cliente",
      selector: row => row.CustomerName,
      sortable: true,
      width: "273px",
    },
    {
      name: "Fecha Expedición",
      selector: row => row.InvoiceDate,
      sortable: true,
      width: "163px",
    },
    {
      name: "Vencimiento",
      selector: row => row.InvoiceDateExp,
      sortable: true,
      width: "163px",
    },
    {
      name: "Moneda",
      selector: row => row.Coin,
      sortable: true,
      width: "100px",
    },
    {
      name: "Valor",
      selector: row => row.TotalValue,
      sortable: true,
      width: "100px",
    },
    {
      name: "Estado",
      selector: row => row.State,
      sortable: true,
      width: "100px",
    },
    {
      name: "Sucursal",
      selector: () => localStorage.getItem("Agencia"),
      sortable: true,
      width: "273px",
    },
    {
      name: "Tipo",
      selector: row => row.Type,
      sortable: true,
      width: "100px",
    },
  ];

  const customerColumns = [
    {
      name: "Identificación",
      selector: row => row.documentNumber,
      sortable: true,
      width: "115px",
      style: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      name: "Nombres",
      selector: row => row.firstName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Apellidos",
      selector: row => row.lastName,
      sortable: true,
      width: "150px",
    },
    {
      width: "100px",
      cell: () => null,
      ignoreRowClick: true,
    },
  ];

  // ESTILOS CONDICIONALES
  const rowStyles = [
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

  // COMPONENTES MODALES
  const customerModalContent = (
    <Form>
      <Form.Group>
        {["mostrar_todos", "identificacion", "nombre", "apellido"].map(option => (
          <div key={option} className="modal-option">
            <Form.Check
              type="radio"
              label={
                option === "mostrar_todos" ? "Mostrar todos" :
                  option === "identificacion" ? "Documento identificación" :
                    option === "nombre" ? "Nombre" : "Apellido"
              }
              value={option}
              checked={customerSearchOption === option}
              onChange={handleCustomerSearchOptionChange}
              className="me-2"
            />
            {customerSearchOption === option && option !== "mostrar_todos" && (
              <Form.Control
                type="text"
                placeholder={`Buscar por ${option === "identificacion" ? "documento" :
                  option === "nombre" ? "nombre" : "apellido"
                  }...`}
                value={customerSearchValue}
                onChange={(e) => setCustomerSearchValue(e.target.value)}
                autoFocus
              />
            )}
          </div>
        ))}
      </Form.Group>

      <div className="grid-container" style={{
        maxHeight: "300px",
        overflowY: "auto",
        marginTop: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "10px",
      }}>
        <DataTable
          columns={customerColumns}
          data={currentCustomers}
          className="custom-table"
          conditionalRowStyles={rowStyles}
          noDataComponent={
            <div className="py-4 text-center">No se encontraron resultados</div>
          }
          style={{ cursor: "pointer", color: "blue" }}
        />
      </div>

      <div style={{ marginTop: "15px", textAlign: "right" }}>
        <button className="btn btn-secondary" onClick={handleClearCustomerFilters}>
          Limpiar
        </button>
      </div>
    </Form>
  );

  const searchModalContent = (
    <Form>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Últimas 10 facturas"
          value="ultimas10"
          checked={searchOption === "ultimas10"}
          onChange={handleSearchOptionChange}
        />

        <Form.Check
          type="radio"
          label="Rango de fecha"
          value="rangoFecha"
          checked={searchOption === "rangoFecha"}
          onChange={handleSearchOptionChange}
        />

        {searchOption === "rangoFecha" && (
          <div className="mt-3">
            <div className="mb-3 d-flex align-items-center">
              <Form.Label className="me-2" style={{ minWidth: "100px" }}>
                Fecha Inicio:
              </Form.Label>
              <DatePicker
                selected={searchFilters.startDate}
                onChange={date => setSearchFilters({ ...searchFilters, startDate: date })}
                selectsStart
                startDate={searchFilters.startDate}
                endDate={searchFilters.endDate}
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
                selected={searchFilters.endDate}
                onChange={date => setSearchFilters({ ...searchFilters, endDate: date })}
                selectsEnd
                startDate={searchFilters.startDate}
                endDate={searchFilters.endDate}
                minDate={searchFilters.startDate}
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
          checked={searchOption === "numeroFactura"}
          onChange={handleSearchOptionChange}
        />

        {searchOption === "numeroFactura" && (
          <div className="mt-3 d-flex align-items-center">
            <Form.Label className="me-2">Número:</Form.Label>
            <Form.Control
              type="text"
              value={searchFilters.invoiceNumber}
              onChange={e => setSearchFilters({ ...searchFilters, invoiceNumber: e.target.value })}
              className="me-3"
              placeholder="Ingrese número de factura"
            />
          </div>
        )}

        <Form.Check
          type="radio"
          label="Cliente"
          value="numeroIdentificacion"
          checked={searchOption === "numeroIdentificacion"}
          onChange={handleSearchOptionChange}
        />

        {searchOption === "numeroIdentificacion" && (
          <div className="mt-3 d-flex align-items-center">
            <Form.Label className="me-2">Identificación:</Form.Label>
            <Form.Control
              type="text"
              value={searchFilters.customerId}
              onChange={e => setSearchFilters({ ...searchFilters, customerId: e.target.value })}
              className="me-3"
              placeholder="Ingrese número de identificación"
            />
            <ButtonDetails cuerpoModal={customerModalContent} />
          </div>
        )}
      </Form.Group>
    </Form>
  );

  return (
    <>
      <NavBar />

      <MenuFacturas />
      <FacNavbar cuerpoModal={searchModalContent} />

      <div className="table-container">
        <DataTable
          columns={invoiceColumns}
          data={currentInvoices}
          className="custom-table"
          conditionalRowStyles={rowStyles}
          responsive
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={Math.ceil(invoices.length / ROWS_PER_PAGE)}
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