import React from 'react'
import "./ButtonDetails.css"
import ModalGenerico from '../ModalGenerico/ModalGenerico'; // Importar el modal genérico

function ButtonDetails({ cuerpoModal, piePagina, onSearchClick }) {
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
        titulo="Buscar"
        cuerpo={cuerpoModal}
        onGuardar={handleCloseModal}
      />


      <svg  style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" onClick={handleSearchClick}>
        <path fill="#199be2" d="M35.983,32.448l-3.536,3.536l7.87,7.87c0.195,0.195,0.512,0.195,0.707,0l2.828-2.828	c0.195-0.195,0.195-0.512,0-0.707L35.983,32.448z"></path><radialGradient id="KGt2acGa95QyN2j07oBX6a_KPmthqkeTgDN_gr1" cx="20.024" cy="20.096" r="19.604" gradientUnits="userSpaceOnUse"><stop offset=".693" stop-color="#006185"></stop><stop offset=".921" stop-color="#35c1f1"></stop></radialGradient><polygon fill="url(#KGt2acGa95QyN2j07oBX6a_KPmthqkeTgDN_gr1)" points="31.601,28.065 28.065,31.601 32.448,35.983 35.983,32.448"></polygon><linearGradient id="KGt2acGa95QyN2j07oBX6b_KPmthqkeTgDN_gr2" x1="8.911" x2="31.339" y1="8.911" y2="31.339" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a3ffff"></stop><stop offset=".223" stop-color="#9dfbff"></stop><stop offset=".53" stop-color="#8bf1ff"></stop><stop offset=".885" stop-color="#6ee0ff"></stop><stop offset="1" stop-color="#63daff"></stop></linearGradient><circle cx="20" cy="20" r="16" fill="url(#KGt2acGa95QyN2j07oBX6b_KPmthqkeTgDN_gr2)"></circle>
      </svg>
    </div>

  )
}

export default ButtonDetails