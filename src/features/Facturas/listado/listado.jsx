


// listado.jsx REFACTORIZADO
import React, { useState } from "react";
import { Pagination } from "@mui/material";
import DataTable from "react-data-table-component";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import NavBar from "../../../shared/components/NavBar/Navbar";
import MenuFacturas from "../menufacturas/menuFacturas";
import FacNavbar from "../../../shared/components/FacNavbar/FacNavbar";
import SearchModal from "../../../shared/components/SearchModal/SearchModal";

import { useInvoices } from "../../../hooks/useInvoices";
import { usePagination } from "../../../hooks/usePagination";
import { invoiceColumns } from "../../../config/tableColumns";

import "./listado.css";

registerLocale("es", es);

const ListadoFacturacion = () => {

  const [searchOption, setSearchOption] = useState("ultimas10");

  const {
    invoices,
    loading,
    error,
    queryType,
    setQueryType,
    searchFilters,
    setSearchFilters,
    refetchInvoices // ✅ Usar esta función para buscar
  } = useInvoices();

  const handleSearchExecute = () => {
    refetchInvoices(); // ✅ Ejecuta la búsqueda con los parámetros actuales
  };

  const {
    currentData: currentInvoices,
    currentPage,
    totalPages,
    handlePageChange
  } = usePagination(invoices, 10);

  // Loading state
  if (loading) {
    return (
      <>
        <NavBar />
        <MenuFacturas />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando facturas...</p>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <NavBar />
        <MenuFacturas />
        <div className="error-container">
          <h3>Error al cargar facturas</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <MenuFacturas />



      <div className="table-listados">
        <DataTable
          columns={invoiceColumns}
          data={currentInvoices}
          className="listado-table"
          responsive
          noDataComponent={
            <div className="no-data">
              <p>No se encontraron facturas</p>
            </div>
          }
        />
       
      </div>
       <FacNavbar
          cuerpoModal={
            <SearchModal
              searchOption={searchOption}
              setSearchOption={setSearchOption}
              queryType={queryType}
              setQueryType={setQueryType}
              searchFilters={searchFilters}
              setSearchFilters={setSearchFilters}
            />
          }
          onSearchExecute={handleSearchExecute}
        />

        {totalPages > 1 && (
          <div className="pagination-container">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
    </>
  );
};

export default ListadoFacturacion;























