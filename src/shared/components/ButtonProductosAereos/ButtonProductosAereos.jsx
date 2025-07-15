import React from 'react'
// import "./ButtonDetails.css"
import ModalGenerico from '../ModalGenerico/ModalGenerico'; // Importar el modal genérico

function ButtonProductosAereos({ cuerpoModalProducto, piePagina, onSearchClick }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSearchClick = () => {

    setShowModal(true);
    if (onSearchClick) onSearchClick(); // Notificar al componente padre que se hizo clic en busca
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="form-tipo-dre" >



      <ModalGenerico
        show={showModal}
        onHide={handleCloseModal}
        titulo="Tipos de productos"
        cuerpo={cuerpoModalProducto}
        onGuardar={handleCloseModal}
        botonBuscar="Ver"
      />

        <button 
        className="navigation-button active" onClick={handleSearchClick}>
            Ver
        </button>
    </div>

  )
}

export default ButtonProductosAereos