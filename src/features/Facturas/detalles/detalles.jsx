import React, { useEffect, useState } from "react";
import "./detalles.css";
import DataTable from "react-data-table-component";
import { Pagination } from "@mui/material";
import { Form, InputGroup } from "react-bootstrap";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import FacturaService from '../../../services/FacturaService';
import FormDetalles from '../../../shared/FormDetalles/FormDetalles'
import Col from 'react-bootstrap/Col'; import ButtonDetails from "../../../shared/components/ButtonDetails/ButtonDetails";



import ModalGenerico from "../../../shared/components/ModalGenerico/ModalGenerico";
import FacNavbar from "../../../shared/components/FacNavbar/FacNavbar";

function Detalles() {
  const [facturas, setFacturas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("mostrar_todos");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    documentNumber: "",
    firstName: "",
    lastName: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Filtrado cuando cambian los filtros
  useEffect(() => {
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
      setCurrentPage(1);
    }
  }, [searchFilters, facturas]);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setSearchValue("");

    // Si selecciona "mostrar todos", limpiar filtros inmediatamente
    if (option === "mostrar_todos") {
      setSearchFilters({
        documentNumber: "",
        firstName: "",
        lastName: "",
      });
    }
  };

  // Filtrado en tiempo real mientras escribe en el modal
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

  const handleSearchSubmit = () => {
    setShowModal(false);
  };

  const handleClearFilters = () => {
    setSelectedOption("mostrar_todos");
    setSearchValue("");
    setSearchFilters({
      documentNumber: "",
      firstName: "",
      lastName: "",
    });
    setShowModal(false);
  };

  const columnas = [
    {
      name: "Identificación",
      selector: (row) => row.documentNumber,
      sortable: true,
      width: "115px",
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
      width: "100px",
      cell: () => null,
      ignoreRowClick: true,
    },
  ];

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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const cuerpoModal = (
    <Form>
      <Form.Group>
        {["mostrar_todos", "identificacion", "nombre", "apellido"].map((option) => (
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
                  placeholder={`Buscar por ${option === "identificacion"
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
        ))}
      </Form.Group>

      {/* Aquí ajustamos el tamaño de la tabla */}
      <div
        className="grid-container"
        style={{
          maxHeight: "300px", // ajusta según lo que necesites
          overflowY: "auto",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <DataTable
          columns={columnas}
          data={currentRows}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={
            <div className="py-4 text-center">No se encontraron resultados</div>
          }
        />
      </div>

      <div className="button-group" style={{ marginTop: "15px", textAlign: "right" }}>
        <button className="btn btn-secondary" onClick={handleClearFilters}>
          Limpiar
        </button>
      </div>
    </Form>
  );



  return (
    <div style={{ width: "100%", padding: "0 20px" }}>
      {" "}
      {/* Contenedor principal */}
      <NavBar />
      <MenuFacturas />
      <FacNavbar />

      <div className="form-tipo-trm"
        style={{ width: '400px', height: '30px',marginBottom : '60px'}}
        as={Col}
        md="3"
        controlId="validationCustom04">
        <Form.Label style={{}}  >Identificacion  </Form.Label>
        
        <div   className="form-tipo-trn" style={{display:'flex' }}   >
          <Form.Control style={{ width: '200px', height :'40px' }} type="text" required />
          <ButtonDetails style={{ margin: '0px' }} cuerpoModal={cuerpoModal} />
        </div>

      </div>



      < FormDetalles />

      <div className="table-container">
        <DataTable
          columns={columnas}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={
            <div className="py-4 text-center">No se encontraron resultados</div>
          }

        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
      {/* Modal */}
    </div>
  );
}

export default Detalles;
