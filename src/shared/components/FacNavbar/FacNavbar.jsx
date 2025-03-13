import React, { useState } from 'react';
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
import Modal from 'react-bootstrap/Modal'; // Importar el modal de react-bootstrap
import Button from 'react-bootstrap/Button'; // Importar el botón de react-bootstrap
import Form from 'react-bootstrap/Form'; // Importar el componente Form de react-bootstrap

const FacNavbar = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [selectedOption, setSelectedOption] = useState(""); // Estado para controlar la opción seleccionada

  const handleSearchClick = () => {
    setShowModal(true); // Abrir el modal al hacer clic en el botón de búsqueda
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Actualizar la opción seleccionada
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
          { src: imgSearch, alt: "Search", label: "", onClick: handleSearchClick }, // Asignar la función al botón de búsqueda
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
              onClick={onClick} // Asignar la función onClick si existe
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenido del modal */}
          <Form>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Últimas 10 facturas"
                value="ultimas10"
                checked={selectedOption === "ultimas10"}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Rango de fecha"
                value="rangoFecha"
                checked={selectedOption === "rangoFecha"}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Número de factura"
                value="numeroFactura"
                checked={selectedOption === "numeroFactura"}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Tiquete"
                value="tiquete"
                checked={selectedOption === "tiquete"}
                onChange={handleOptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FacNavbar;