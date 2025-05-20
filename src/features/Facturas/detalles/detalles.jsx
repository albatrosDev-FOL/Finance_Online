import React, { useEffect, useState } from "react";
import "./detalles.css";
import DataTable from "react-data-table-component";
import { Pagination } from "@mui/material";
import { Form, InputGroup } from "react-bootstrap";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import ModalGenerico from '../../../shared/components/ModalGenerico/ModalGenerico';
import FacturaService from '../../../services/FacturaService';
import FormDetalles from '../../../shared/FormDetalles/FormDetalles'


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
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        console.log("Respuesta servidor", response.CustomerList )

        
        // Verificar y forzar array
        const dataArray = Array.isArray( response.CustomerList) ?  response.CustomerList : [];

        if(dataArray.length > 0){
          const firstResult = dataArray[0];
        }

        const mappedFilters ={
          documentNumber: firstResult.DocumentNumber || "",
          firstName: firstResult.FirstName || "",
          lastName: firstResult.LastName || ""
        }

              setSearchFilters(mappedFilters);


        // setFacturas(dataArray);
        

  
      } catch (error) {
        console.error("Error:", error);
        setFacturas([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [searchFilters]);
  
  // 3. Modificar el slice con verificación
  


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
      width: "250px",
      style: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      name: "Nombres",
      selector: (row) => row.firstName,
      sortable: true,
      width: "420px",
    },
    {
      name: "Apellidos",
      selector: (row) => row.lastName,
      sortable: true,
      width: "420px",
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
      <div className="button-group">
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
      <FormDetalles/>
{/* 
      <div className='table-containner'>
        <DataTable
          columns={columnas}
          data={currentRows}
          className="custom-table"
          conditionalRowStyles={conditionalRowStyles}
          responsive
          pagination
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30]}
          onChangePage={page => setCurrentPage(page)}
        />
      </div> */}


      



      <ModalGenerico
        show={showModal}
        onHide={() => setShowModal(false)}
        titulo="Buscar"
        cuerpo={cuerpoModal}
        onGuardar={handleSearchSubmit}
      />
    </div>
  );
}

export default Detalles;
