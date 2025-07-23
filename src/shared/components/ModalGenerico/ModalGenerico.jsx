import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalGenerico = ({ show, onHide, titulo, cuerpo, onGuardar, botonBuscar,cancelar,  onSearchClick, modalClass }) => {
  return (
<<<<<<< HEAD
    <Modal  show={show}>
=======
    <Modal show={show} onHide={onHide} dialogClassName={`modal-90w ${modalClass || ''}`}>
>>>>>>> f298e1d10e4ac2abeb03653752294b8c31766712
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
