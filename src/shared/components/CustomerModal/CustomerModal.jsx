// components/CustomerModal.jsx
import React from 'react';
import { Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useCustomers } from '../../../hooks/useCustomers';
import { usePagination } from '../../../hooks/usePagination';

const CustomerModal = ({ onClose }) => {
  const {
    customers,
    loading,
    error,
    searchOption,
    setSearchOption,
    searchValue,
    setSearchValue,
    clearFilters
  } = useCustomers();

  const { currentData: currentCustomers } = usePagination(customers);

  const customerColumns = [
    {
      name: "Identificación",
      selector: row => row.documentNumber,
      sortable: true,
      width: "155px",
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
  ];

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
              checked={searchOption === option}
              onChange={(e) => setSearchOption(e.target.value)}
              className="me-2"
            />
            {searchOption === option && option !== "mostrar_todos" && (
              <Form.Control
                type="text"
                placeholder={`Buscar por ${option === "identificacion" ? "documento" :
                  option === "nombre" ? "nombre" : "apellido"
                }...`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
            )}
          </div>
        ))}
      </Form.Group>

      <div className="customer-table-container">
        <DataTable
          columns={customerColumns}
          data={currentCustomers}
          className="custom-table"
          noDataComponent={
            <div className="py-4 text-center">No se encontraron resultados</div>
          }
        />
      </div>

      <div style={{ marginTop: "15px", textAlign: "right" }}>
        <button className="btn btn-secondary" style={{ width: "10px" }} onClick={clearFilters}>
          Limpiar
        </button>
        <button className="btn btn-primary ms-2" style={{ width: "100px" }} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </Form>
  );
};

export default CustomerModal;