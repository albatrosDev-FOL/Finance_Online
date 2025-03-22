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
import ModalGenerico from '../ModalGenerico/ModalGenerico'; // Importar el modal genérico

const FacNavbar = ({ cuerpoModal, piePagina, onSearchClick }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
    if (onSearchClick) onSearchClick(); // Notificar al componente padre que se hizo clic en buscar
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
          { src: imgFile, alt: "File", label: "" },
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

      {/* Modal genérico */}
      <ModalGenerico
        show={showModal}
        onHide={handleCloseModal}
        titulo="Buscar"
        cuerpo={cuerpoModal}
        onGuardar={handleCloseModal}
      />
    </div>
  );
};

export default FacNavbar;