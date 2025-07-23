import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function ProductosAereos({ show, onHide, titulo, cuerpo, onGuardar, cuerpoModalProducto, piePagina, onSearchClick }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
    if (onSearchClick) onSearchClick(); // Notificar al componente padre que se hizo clic
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };




  return (
    <div className="form-tipo-dre" style={{   }}>
      <Form    >

        <div style={{ fontSize: "px", padding: "10px" , marginBottom : "10px",'border-style': 'inset' }} >
          <Row className="mb-3">
            <Col  style={{ fontSize: "10px" ,  }}  md={3}>
              <Form.Label>Producto</Form.Label><Form.Control />
              <Form.Label>Proveedor</Form.Label><Form.Control />
              <Form.Label>Proveedor del servicio</Form.Label><Form.Control />

            </Col>

            <Col style={{ paddingTop :"60px", paddingLeft: "60px",fontSize: "12px" ,  }}>

              <Form.Check type="checkbox" label="Revisión" />
              <Form.Check type="checkbox" label="Conjunción" />
              <Form.Check type="checkbox" label="Eléctrico" />

            </Col>

            <Col style={{ paddingTop :"60px", fontSize: "12px" , }}>
              <Form.Label>Tiquete conjuncion </Form.Label><Form.Control />
            </Col>
          </Row>
        </div>
        {/* Sección Producto */}


        <div className="form-tipo-dre" style={{ fontSize: "px", padding: "10px" , 'border-style': 'inset' }}>
          {/* Datos Aéreos */}
          <Row className="mb-3">
            <Col md={1} ><Form.Label style={{ fontSize: "14px" }}>Serie </Form.Label><Form.Control label="" /> </Col>
            <Col md={1}  ><Form.Label style={{ fontSize: "14px" }}>Número </Form.Label><Form.Control placeholder="" /></Col>
            <Col md={2}  ><Form.Label style={{ fontSize: "14px" }}>Tarifa </Form.Label><Form.Control placeholder="" /></Col>
            <Col md={2}  ><Form.Label style={{ fontSize: "14px" }}>Total </Form.Label><Form.Control placeholder="" /></Col>
            <Col md={2}  ><Form.Label style={{ fontSize: "14px" }}>Tarifa.extranjera </Form.Label><Form.Control placeholder=" " /></Col>
            <Col md={2}  ><Form.Label style={{ fontSize: "14px" }}>Precio.Referencia </Form.Label><Form.Control placeholder="  " /></Col>
            <Col md={2}  ><Form.Label style={{ fontSize: "14px" }}>Tiq.Promocion </Form.Label><Form.Control label="" /></Col>
          </Row>

          {/* Pasajero y reserva */}
          <Row className="mb-3">
            <Col md={3}><Form.Label style={{ fontSize: "14px" }}>Apellidos </Form.Label><Form.Control placeholder="" /></Col>
            <Col md={3}><Form.Label style={{ fontSize: "14px" }}>Nombres </Form.Label><Form.Control placeholder="" /></Col>
            <Col md={3}><Form.Label style={{ fontSize: "14px" }}>Razón de viaje </Form.Label><Form.Control placeholder=" " /></Col>
            <Col md={3}><Form.Label style={{ fontSize: "14px" }}>Tarifa de referencia </Form.Label><Form.Control placeholder=" " /></Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}><Form.Label>Fecha Reserva</Form.Label><Form.Control type="date" /></Col>
            <Col md={3}><Form.Label>ID Empleado</Form.Label><Form.Control /></Col>
            <Col md={3}><Form.Label>Centro de Costo</Form.Label><Form.Control /></Col>
            <Col md={3}><Form.Label>Convenio </Form.Label><Form.Control /></Col>
          </Row>
          <div style={{ fontSize: "14px" , display: 'flex' }}>
            <div>
               {/* Vuelo */}

          <Row className="mb-3">
            <Col md={2}><Form.Label>Origen</Form.Label><Form.Control placeholder="Origen" /></Col>
            <Col md={2}><Form.Label>Destino</Form.Label><Form.Control placeholder="Destino" /></Col>
            <Col md={2}><Form.Label>Clase</Form.Label><Form.Control placeholder="Clase" /></Col>
            <Col md={2}><Form.Label>Fecha</Form.Label><Form.Control type="date" /></Col>

          </Row>

          <Row className="mb-3">
            <Col md={3}><Form.Control placeholder="Número de Vuelo" /></Col>
            <Col md={3}><Form.Control placeholder="" /></Col>
            <Col md={4}><Button variant="outline-primary">Agregar</Button></Col>
          </Row>

            </div>
            <div>
               {/* Impuesto */}
          <Row className="mb-3">
            <Col md={4}><Form.Label>Impuesto</Form.Label><Form.Control /></Col>
            <Col md={4}><Form.Label>Valor Neto</Form.Label><Form.Control type="number" /></Col>
            <Col md={4}>
              <Button variant="outline-success" className="me-2">Agregar</Button>
              <Button variant="outline-danger">Eliminar</Button>
            </Col>
          </Row>
            </div>
          </div>
         
         

        </div>


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
