import React, { useEffect, useState, useMemo } from "react";
import "./detalles.css";
import DataTable from "react-data-table-component";
import { Form, InputGroup } from "react-bootstrap";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import FacturaService from "../../../services/FacturaService";
import FormDetalles from "../../../shared/FormDetalles/FormDetalles";
import ButtonDetails from "../../../shared/components/ButtonDetails/ButtonDetails";
import FacNavbar from "../../../shared/components/FacNavbar/FacNavbar";

function Detalles() {
  const [facturas, setFacturas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("mostrar_todos");
  const [searchValue, setSearchValue] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    documentNumber: "",
    firstName: "",
    lastName: "",
  });

  const [identificacion, setIdentificacion] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");

      try {
        const response = await FacturaService.getDetalles(
          idTravelBranch,
          token,
          {}
        );

        if (response?.CustomerList) {
          const mappedData = response.CustomerList.map((item) => ({
            documentNumber: item.DocumentNumber,
            firstName: item.FirstName,
            lastName: item.LastName,
            isEnabled: item.IsEnabled,
            rawData: item,
          }));
          setFacturas(mappedData);
          setFilteredData(mappedData);
        }
      } catch (error) {
        console.error("Error:", error);
        setFacturas([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, []);

  // Filtrado optimizado con useMemo
  useMemo(() => {
    if (Object.values(searchFilters).every((val) => val === "")) {
      setFilteredData(facturas);
    } else {
      const filtered = facturas.filter(
        (item) =>
          (searchFilters.documentNumber === "" ||
            item.documentNumber
              .toLowerCase()
              .includes(searchFilters.documentNumber.toLowerCase())) &&
          (searchFilters.firstName === "" ||
            item.firstName
              .toLowerCase()
              .includes(searchFilters.firstName.toLowerCase())) &&
          (searchFilters.lastName === "" ||
            item.lastName
              .toLowerCase()
              .includes(searchFilters.lastName.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchFilters, facturas]);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setSearchValue("");

    if (option === "mostrar_todos") {
      setSearchFilters({
        documentNumber: "",
        firstName: "",
        lastName: "",
      });
    }
  };

  useEffect(() => {
    if (selectedOption === "identificacion") {
      setSearchFilters({
        documentNumber: searchValue,
        firstName: "",
        lastName: "",
      });
    } else if (selectedOption === "nombre") {
      setSearchFilters({
        documentNumber: "",
        firstName: searchValue,
        lastName: "",
      });
    } else if (selectedOption === "apellido") {
      setSearchFilters({
        documentNumber: "",
        firstName: "",
        lastName: searchValue,
      });
    }
  }, [searchValue, selectedOption]);

  const handleClearFilters = () => {
    setSelectedOption("mostrar_todos");
    setSearchValue("");
    setSearchFilters({
      documentNumber: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleRowClick = (row) => {
    if (row.isEnabled) {
      setIdentificacion(row.documentNumber);
      setNombreCliente(row.firstName);
    }
  };

  // Columnas optimizadas con memoización
  const columnas = useMemo(() => [
    {
      name: "Identificación",
      selector: (row) => row.documentNumber,
      sortable: true,
      width: "120px",
      style: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      name: "Nombres",
      selector: (row) => row.firstName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Apellidos",
      selector: (row) => row.lastName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Estado",
      cell: (row) => (
        <span style={{
          color: row.isEnabled ? "green" : "red",
          fontWeight: "bold"
        }}>
          {row.isEnabled ? "✓" : "✗"}
        </span>
      ),
      width: "80px",
      ignoreRowClick: true,
    },
  ], []);

  // Estilos condicionales optimizados
  const conditionalRowStyles = useMemo(() => [
    {
      when: (row) => !row.isEnabled,
      style: {
        backgroundColor: "#f8f9fa",
        color: "#6c757d",
        cursor: "not-allowed",
      },
    },
    {
      when: (row) => row.isEnabled,
      style: {
        cursor: "pointer",
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.04) !important',
        },
      },
    },
  ], []);

  // Custom styles optimizado
  const customStyles = useMemo(() => ({
    rows: {
      style: {
        minHeight: '48px',
      },
    },
  }), []);

  // Cuerpo del modal optimizado
  const cuerpoModal = useMemo(() => (
    <Form>
      <Form.Group>
        {["mostrar_todos", "identificacion", "nombre", "apellido"].map(
          (option) => (
            <div key={option} className="modal-option">
              <Form.Check
                type="radio"
                label={
                  option === "mostrar_todos"
                    ? "Mostrar todos"
                    : option === "identificacion"
                    ? "Documento identificación"
                    : option === "nombre"
                    ? "Nombre"
                    : "Apellido"
                }
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="me-2"
              />
              {selectedOption === option && option !== "mostrar_todos" && (
                <InputGroup className="modal-input-group">
                  <Form.Control
                    type="text"
                    placeholder={`Buscar por ${
                      option === "identificacion"
                        ? "documento"
                        : option === "nombre"
                        ? "nombre"
                        : "apellido"
                    }...`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                  />
                </InputGroup>
              )}
            </div>
          )
        )}
      </Form.Group>

      <div
        className="grid-container"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <DataTable
          columns={columnas}
          data={filteredData}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          onRowClicked={handleRowClick}
          customStyles={customStyles}
          noDataComponent={
            <div className="py-4 text-center">No se encontraron resultados</div>
          }
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
        />
      </div>

      <div
        className="button-group"
        style={{ marginTop: "15px", textAlign: "right" }}
      >
        <button className="btn btn-secondary" onClick={handleClearFilters}>
          Limpiar
        </button>
      </div>
    </Form>
  ), [selectedOption, searchValue, filteredData, columnas, conditionalRowStyles, customStyles]);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <NavBar />
      <MenuFacturas />
      <FacNavbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#333",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Datos del Cliente
          </h3>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <div style={{ flex: "1", minWidth: "250px" }}>
              <Form.Label>Identificación</Form.Label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Form.Control
                  style={{ width: "100%", height: "40px" }}
                  type="text"
                  required
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                />
                <ButtonDetails cuerpoModal={cuerpoModal} />
              </div>
            </div>

            <div style={{ flex: "1", minWidth: "250px" }}>
              <Form.Label>Nombre Cliente</Form.Label>
              <Form.Control
                style={{ width: "100%", height: "40px" }}
                type="text"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#333",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Datos de Factura
          </h3>
          <FormDetalles />
        </div>
      </div>
    </div>
  );
}

export default Detalles;