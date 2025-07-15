import React from 'react'
import { Modal, Button, Form, Row, Col, ModalTitle, ModalHeader, ModalDialog } from 'react-bootstrap';


function productosAereos(show, onHide, titulo, cuerpo, onGuardar) {

   const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Productos Aéreos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Sección Producto */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formProducto">
                <Form.Label>Producto</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProducto">
                <Form.Label>Proveedor</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProducto">
                <Form.Label>Proveedor del Producto</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProveedor">
                <Form.Label>Proveedor</Form.Label>
                <Form.Control as="select">
                  <option>ADA AEROLINEAS DE ANTIOQUIA</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Datos Aéreos */}
          <Row className="mb-3">
            <Col md={2}><Form.Control placeholder="Serie" /></Col>
            <Col md={2}><Form.Control placeholder="Número" /></Col>
            <Col md={2}><Form.Control placeholder="Tarifa" /></Col>
            <Col md={2}><Form.Control placeholder="Total" /></Col>
            <Col md={2}><Form.Control placeholder="Ref. Precio" /></Col>
            <Col md={2}><Form.Control placeholder="Promoción" /></Col>
          </Row>

          {/* Pasajero y reserva */}
          <Row className="mb-3">
            <Col md={4}><Form.Control placeholder="Apellidos" /></Col>
            <Col md={4}><Form.Control placeholder="Nombres" /></Col>
            <Col md={4}><Form.Control placeholder="Razón de viaje" /></Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}><Form.Label>Fecha Reserva</Form.Label><Form.Control type="date" /></Col>
            <Col md={4}><Form.Label>ID Empleado</Form.Label><Form.Control /></Col>
            <Col md={4}><Form.Label>Centro de Costo</Form.Label><Form.Control /></Col>
          </Row>

          {/* Vuelo */}
          <Row className="mb-3">
            <Col md={4}><Form.Control placeholder="Origen" /></Col>
            <Col md={4}><Form.Control placeholder="Destino" /></Col>
            <Col md={4}><Form.Control placeholder="Clase" /></Col>
          </Row>

          <Row className="mb-3">
            <Col md={8}><Form.Control placeholder="Número de Vuelo" /></Col>
            <Col md={4}><Button variant="outline-primary">Agregar</Button></Col>
          </Row>

          {/* Impuesto */}
          <Row className="mb-3">
            <Col md={4}><Form.Label>Impuesto</Form.Label><Form.Control /></Col>
            <Col md={4}><Form.Label>Valor Neto</Form.Label><Form.Control type="number" /></Col>
            <Col md={4}>
              <Button variant="outline-success" className="me-2">Agregar</Button>
              <Button variant="outline-danger">Eliminar</Button>
            </Col>
          </Row>

          {/* Pagos */}
          <Row className="mb-3">
            <Col md={6}><Form.Control placeholder="Forma de Pago" /></Col>
            <Col md={6}><Form.Control placeholder="Valor" /></Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
        <Button variant="primary">Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default productosAereos
