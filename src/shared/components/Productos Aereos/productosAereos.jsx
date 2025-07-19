import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ModalGenerico from '../ModalGenerico/ModalGenerico'; // asegúrate de que el componente existe y está bien importado

function ProductosAereos({ show, onHide, titulo, cuerpo, onGuardar, cuerpoModalProducto, piePagina, onSearchClick }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
    if (onSearchClick) onSearchClick(); // Notificar al componente padre que se hizo clic
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const contenidoModal = (
    <Form>
    <div className ="contect#1"style={{display:'flex'}}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formProducto">
            <Form.Label>Producto</Form.Label>
            <Form.Control as="select">
              <option></option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProveedorProducto">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control as="select">
              <option></option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProveedorDelProducto">
            <Form.Label>Proveedor del Producto</Form.Label>
            <Form.Control as="select">
              <option></option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
      

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
  );

  return (
    <div className="form-tipo-dre">
      <Form >
        {/* Sección Producto */}
        <Row className="mb-3">
          <Col md={6} >
            <div><Form.Group controlId="formProducto">
              <Form.Label>Producto</Form.Label>
              <Form.Control as="select">
                <option></option>
              </Form.Control>
            </Form.Group>
              <Form.Group controlId="formProveedorProducto">
                <Form.Label>Proveedor</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProveedorDelProducto">
                <Form.Label>Proveedor del Servicio</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>

              </Form.Group>
            </div>

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

    </div>
  );
}

export default ProductosAereos;
