import React, { useState } from "react";
// import "./ButtonDetails.css"
import ModalGenerico from "../ModalGenerico/ModalGenerico"; // Importar el modal genérico
import ProductosAereos from "../Productos Aereos/productosAereos";
import ProductoasAereos1 from"../Productos Aereos/productoAereos1"
import "./ButtonAgregarItem.css";


function ButtonAgregarItem({ cuerpoModalItem, selectedProductType }) {
  const [showModal, setShowModal] = React.useState(false);
  const [mostrarBuscador, setMostrarBuscador] = useState(false); // <- NUEVO

  const handleOpenModal = () => {
    setShowModal(true);
    setMostrarProductosAereos(false); // Siempre empieza mostrando cuerpoModalItem
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setMostrarBuscador(false); // Opcional: ocultar el buscador al cerrar el modal
  };

  // Esta función se ejecuta cuando se hace clic en "Buscar" dentro del modal
  const handleBuscarClick = () => {
    setMostrarBuscador(true); // Mostrar el componente buscador dentro del modal
  };

  return (
    <div className="form-tipo-dre">
      <ModalGenerico
        show={showModal}
        onHide={handleCloseModal}
        titulo="Productos Aereos"
        cuerpo={
          <div className={mostrarBuscador ? "cuerpo-modal-grande" : ""}>
            {mostrarBuscador ? (
              <ProductoasAereos1 selectedProductType={selectedProductType} />
            ) : (
              cuerpoModalItem
            )}
            
          </div>
        }
        onGuardar={handleCloseModal}
        botonBuscar="Buscar"
        cancelar="Cancelar"
        onSearchClick={handleBuscarClick} // <- Esta función se pasa al modal
        modalClass="modal-productos-aereos"
      />

      <button className="navigation-button active" onClick={handleOpenModal}>
        Agregar Item
      </button>
    </div>
  );
}

export default ButtonAgregarItem;
