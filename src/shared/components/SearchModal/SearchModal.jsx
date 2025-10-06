// components/SearchModal.jsx
import React from 'react';
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ButtonDetails from "../../../shared/components/ButtonDetails/ButtonDetails";
import CustomerModal from '../CustomerModal/CustomerModal';
import './SearchModal.css';
const QUERY_TYPES = {
  ULTIMAS_10: 1,
  RANGO_FECHA: 2,
  NUMERO_FACTURA: 3,
  TIQUETE: 4
};




const SearchModal = ({
  searchOption,
  setSearchOption,
  queryType,
  setQueryType,
  searchFilters,
  setSearchFilters,
  onSearch  // ✅ Nueva prop para ejecutar búsqueda
}) => {

  const handleSearchOptionChange = (e) => {
    const option = e.target.value;
    setSearchOption(option);

    switch (option) {
      case "ultimas10":
        setQueryType(QUERY_TYPES.ULTIMAS_10);
        // ✅ Para "últimas 10", ejecutar búsqueda inmediatamente
        setSearchFilters({
          startDate: null,
          endDate: null,
          invoiceNumber: "",
          customerId: ""
        });
        // ✅ Ejecutar búsqueda automáticamente para últimas 10
        if (onSearch) {
          setTimeout(() => onSearch(), 100);
        }
        break;
      case "rangoFecha":
        setQueryType(QUERY_TYPES.RANGO_FECHA);
        break;
      case "numeroFactura":
        setQueryType(QUERY_TYPES.NUMERO_FACTURA);
        setSearchFilters(prev => ({
          startDate: null,
          endDate: null,
          invoiceNumber: prev.invoiceNumber,
          customerId: ""
        }));
        break;
      case "tiquete":
        setQueryType(QUERY_TYPES.TIQUETE);
        break;
      case "numeroIdentificacion":
        setQueryType(QUERY_TYPES.TIQUETE);
        setSearchFilters(prev => ({
          startDate: null,
          endDate: null,
          invoiceNumber: "",
          customerId: prev.customerId
        }));
        break;
      default:
        setQueryType(QUERY_TYPES.ULTIMAS_10);
        setSearchFilters({
          startDate: null,
          endDate: null,
          invoiceNumber: "",
          customerId: ""
        });
    }
  };

  // ✅ Función para ejecutar búsqueda manualmente
  const handleExecuteSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Últimas 10 factura"
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
              {/* <DatePicker
                selected={searchFilters.startDate}
                onChange={date => setSearchFilters({ ...searchFilters, startDate: date })}
                selectsStart
                startDate={searchFilters.startDate}
                endDate={searchFilters.endDate}
                minDate={searchFilters.startDate}
                locale="es"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Seleccione fecha inicio"
                isClearable
                popperPlacement="bottom"
                portalId="root-portal"
              /> */}
              <Form.Control
                type="date"
                name="fechaFin"
                style={{ maxWidth: "130px" }}

              />
            </div>

            <div className="d-flex align-items-center">
              <Form.Label className="me-2" style={{ minWidth: "100px" }}>
                Fecha Fin:
              </Form.Label>
              <Form.Control
                type="date"
                name="fechaFin"
                style={{ maxWidth: "130px" }}

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
            <ButtonDetails cuerpoModal={<CustomerModal />} />
          </div>
        )}
      </Form.Group>

      {/* ✅ Botón de búsqueda para opciones que requieren parámetros */}
      {(searchOption === "rangoFecha" || searchOption === "numeroFactura" || searchOption === "numeroIdentificacion") && (
        <div className="mt-3 d-flex justify-content-end">
          <button
            style={{ width: "100px" }}
            type="button"
            className="btn btn-primary"
            onClick={handleExecuteSearch}
          >
            Buscar
          </button>
        </div>
      )}
    </Form>
  );
};

export default SearchModal;