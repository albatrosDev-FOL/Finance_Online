import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalGenerico = ({ show, onHide, titulo, cuerpo, onGuardar, botonBuscar,cancelar,  onSearchClick }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cuerpo}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelar}
        </Button>
        <Button variant="primary" onClick={onSearchClick}>
          {botonBuscar}
        </Button>
      </Modal.Footer>
    </Modal>
    
  );

  
};

export default ModalGenerico;
