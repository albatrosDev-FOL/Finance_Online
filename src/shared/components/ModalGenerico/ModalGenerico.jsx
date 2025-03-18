import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalGenerico = ({ show, onHide, titulo, cuerpo, onGuardar }) => {
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
          Cerrar
        </Button>
        <Button variant="primary" onClick={onGuardar}>
          Buscar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGenerico;