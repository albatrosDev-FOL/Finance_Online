import React, { useEffect, useState } from 'react';
import "./detalles.css";
import DataTable from "react-data-table-component";
import { Form, InputGroup } from "react-bootstrap";
import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import ModalGenerico from '../../../shared/components/ModalGenerico/ModalGenerico';
import FacturaService from '../../../services/FacturaService';


function Detalles() {
  const [facturas, setFacturas] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ documentNumber: "", firstName: "", lastName: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = facturas.slice(indexOfFirstRow, indexOfLastRow);

  // Componente React
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");
      
      try {
        const response = await FacturaService.getDetalles(
          idTravelBranch,
          token,
          searchFilters
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
        // setFacturas([]); // Resetear a array vacío en errores
      }
    };
  
    fetchData();
  }, [searchFilters]);
  
  // 3. Modificar el slice con verificación
  


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchValue("");
  };

  const handleSearchSubmit = () => {
    // Crea un nuevo objeto limpio cada vez
    const newFilters = {};

    // Asigna solo el filtro seleccionado
    if (selectedOption === "identificacion") {
      newFilters.documentNumber = searchValue.trim();
    }
    else if (selectedOption === "nombre") {
      newFilters.firstName = searchValue.trim();
    }
    else if (selectedOption === "apellido") {
      newFilters.lastName = searchValue.trim();
    }

    // Fuerza la actualización incluso si se repiten valores
    setSearchFilters({ ...newFilters, timestamp: Date.now() });
    setCurrentPage(1);
    setShowModal(false);
  };

  const columnas = [
    {
      name: "Identificación",
      selector: (row) => row.documentNumber,
      sortable: true,
      width: "200px",
      style: {
        fontWeight: "bold",
        textAlign: "center"
      }
    },
    {
      name: "Nombre",
      selector: (row) => row.firstName,
      sortable: true,
      width: "150px",
      style: {
        backgroundColor: "#f8f9fa"
      }
    },
    {
      name: "Apellido",
      selector: (row) => row.lastName,
      sortable: true,
      width: "150px",
      style: {
        backgroundColor: "#f8f9fa"
      }
    }
  ];


  const conditionalRowStyles = [
    {
      when: (row, index) => index % 2 === 0,
      style: {
        backgroundColor: "#f4f4f4",
        color: "#333",
      },
    },
    {
      when: (row, index) => index % 2 !== 0,
      style: {
        backgroundColor: "#b01421",
        color: "#fff",
      },
    },
  ];

  const cuerpoModal = (
    <Form>
      <Form.Group>
        {["identificacion", "nombre", "apellido"].map((option) => (
          <div key={option} className="d-flex align-items-center mb-3">
            <Form.Check
              type="radio"
              label={option === "identificacion" ? "Documento identificación" : option === "nombre" ? "Nombre" : "Apellido"}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="me-3"
            />
            {selectedOption === option && (
              <InputGroup style={{ width: "300px" }}>
                <Form.Control
                  type="text"
                  placeholder={`Buscar por ${option}...`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </InputGroup>
            )}
          </div>
        ))}
      </Form.Group>
    </Form>
  );

  const datos = [
    {
      documentNumber: "001-1234567",
      firstName: "María",
      lastName: "García"
    },
    {
      documentNumber: "002-7654321",
      firstName: "Carlos",
      lastName: "Rodríguez"
    }
  ];

  return (
    <div>
      <NavBar />
      <MenuFacturas />
{/* 
      <div className='table-containner'>
        <DataTable
          columns={[
            ...columnas,
            {
              name: (
                <buttonñ
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#336bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  onClick={() => setShowModal(true)}
                >
                  Buscar
                </button>
              ),
              width: "100px",
              cell: () => null, // celda vacía
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
          data={facturas.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
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
