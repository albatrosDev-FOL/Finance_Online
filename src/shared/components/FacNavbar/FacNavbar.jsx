import React from 'react';
import "./FacNavbar.css";
import imgArchivar from "/search/archivar.png";
import imgFile from "/search/File.png";
import imgCancel from "/search/cancel.png";
import imgExit from "/search/exit.png";
import imgSearch from "/search/search.png";
import imgText from "/search/text.png";
import imgSave from "/search/save.png";
import imgImprimir from "/search/imprimir.png";
import imgReturn from "/search/return.png";
import ModalGenerico from '../ModalGenerico/ModalGenerico';
import { useNavigate } from 'react-router-dom'

// ✅ SOLO AGREGAR: Función para manejar la búsqueda
const FacNavbar = ({ cuerpoModal, piePagina, onSearchClick, onSearchExecute }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
    if (onSearchClick) onSearchClick();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ✅ SOLO AGREGAR: Esta función para ejecutar búsqueda
  const handleSearchExecute = () => {
    if (onSearchExecute) {
      onSearchExecute(); // Ejecutar búsqueda en el componente padre
    }
    setShowModal(false); // Cerrar modal después de buscar
  };

  const navegate = useNavigate();

  return (
    <div className="SearchContainer">
      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {[
          { src: imgFile, alt: "File", label: "", onClick: () => navegate("/DetallesFacturacion") },
          { src: imgArchivar, alt: "Archivar", label: "" },
          { src: imgCancel, alt: "Cancelar", label: "" },
          { src: imgExit, alt: "Exit", label: "" },
          { src: imgSearch, alt: "Search", label: "", onClick: handleSearchClick },
          { src: imgText, alt: "Text", label: "" },
          { src: imgSave, alt: "Save", label: "" },
          { src: imgImprimir, alt: "Imprimir", label: "" },
          { src: imgReturn, alt: "Return", label: "" },
        ].map(({ src, alt, label, onClick }, index) => (
          <div
            key={index}
            className="col"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={onClick}
            >
              <img
                src={src}
                alt={alt}
                style={{
                  marginTop: "10px",
                  width: "30px",
                  height: "30px",
                }}
              />
              {label && <span>{label}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ SOLO CAMBIAR: onGuardar para ejecutar búsqueda */}
      <ModalGenerico
        show={showModal}
        onHide={handleCloseModal}
        titulo="Buscar"
        cuerpo={cuerpoModal}
        onGuardar={handleSearchExecute} // ✅ Cambiar esto
        textBotonGuardar="Buscar"       // ✅ Agregar esto
        textBotonCancelar="Cancelar"    // ✅ Agregar esto
      />
    </div>
  );
};

export default FacNavbar;