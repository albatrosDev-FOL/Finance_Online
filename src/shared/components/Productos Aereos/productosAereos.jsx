<<<<<<< HEAD
import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
=======
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import FacturaService from "../../../services/FacturaService";
import "./productosAereos.css"
>>>>>>> f298e1d10e4ac2abeb03653752294b8c31766712

function ProductosAereos({ selectedProductType, onClose }) {
  const [subProducts, setSubProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Estado para todos los campos del formulario
  const [formData, setFormData] = useState({
    producto: "",
    proveedor: "",
    proveedorServicio: "",
    serie: "",
    numero: "",
    tarifa: "",
    total: "",
    refPrecio: "",
    promocion: "",
    apellidos: "",
    nombres: "",
    razonViaje: "",
    fechaReserva: "",
    idEmpleado: "",
    centroCosto: "",
    origen: "",
    destino: "",
    clase: "",
    numeroVuelo: "",
    impuesto: "",
    valorNeto: "",
    formaPago: "",
    valorPago: "",
  });

  // Cargar los subproductos cuando cambie el tipo de producto seleccionado
  useEffect(() => {
    const fetchSubProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("Token");
        const idSucursal = localStorage.getItem("SucursalId");

        if (!token || !idSucursal) {
          throw new Error("Faltan credenciales necesarias");
        }

        const data = await FacturaService.getSubProductsByType(token, {
          idSucursal,
          idProductType: selectedProductType,
        });

        setSubProducts(data.SubProducts || []);
      } catch (err) {
        setError(err.message || "Error al cargar los productos");
        setSubProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProductType) {
      fetchSubProducts();
    }
  }, [selectedProductType]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    onClose(); // Cerrar el modal después de enviar
  };

<<<<<<< HEAD



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

=======
  return (
    <div className="form-tipo-dre">
      <Form onSubmit={handleSubmit}>
        {/* Sección Producto */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProducto">
              <Form.Label>Producto</Form.Label>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                  <span className="ms-2">Cargando productos...</span>
                </div>
              ) : error ? (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              ) : (
                <Form.Control
                  as="select"
                  name="producto"
                  value={formData.producto}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {subProducts.map((product) => (
                    <option
                      key={`product-${product.IdSubProduct}`}
                      value={product.IdSubProduct}
                    >
                      {product.Name}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>

            <Form.Group controlId="formProveedorProducto" className="mt-3">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                as="select"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un proveedor</option>
                {/* Aquí puedes agregar opciones de proveedores si las tienes */}
                <option value="1">Proveedor 1</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProveedorDelProducto" className="mt-3">
              <Form.Label>Proveedor del Servicio</Form.Label>
              <Form.Control
                as="select"
                name="proveedorServicio"
                value={formData.proveedorServicio}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un proveedor de servicio</option>
                {/* Aquí puedes agregar opciones de proveedores de servicio si las tienes */}
                <option value="1">Proveedor Servicio 1</option>
                <option value="2">Proveedor Servicio 2</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Datos Aéreos */}
        <Row className="mb-3">
          <Col md={2}>
            <Form.Control
              placeholder="Serie"
              name="serie"
              value={formData.serie}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Número"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Tarifa"
              name="tarifa"
              value={formData.tarifa}
              onChange={handleInputChange}
              type="number"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Total"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              type="number"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Ref. Precio"
              name="refPrecio"
              value={formData.refPrecio}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Promoción"
              name="promocion"
              value={formData.promocion}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        {/* Pasajero y reserva */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Razón de viaje"
              name="razonViaje"
              value={formData.razonViaje}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Fecha Reserva</Form.Label>
            <Form.Control
              type="date"
              name="fechaReserva"
              value={formData.fechaReserva}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Form.Label>ID Empleado</Form.Label>
            <Form.Control
              name="idEmpleado"
              value={formData.idEmpleado}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Form.Label>Centro de Costo</Form.Label>
            <Form.Control
              name="centroCosto"
              value={formData.centroCosto}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        {/* Vuelo */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Origen"
              name="origen"
              value={formData.origen}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Destino"
              name="destino"
              value={formData.destino}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Clase"
              name="clase"
              value={formData.clase}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              placeholder="Número de Vuelo"
              name="numeroVuelo"
              value={formData.numeroVuelo}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Button variant="outline-primary">Agregar</Button>
          </Col>
        </Row>

        {/* Impuesto */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Impuesto</Form.Label>
            <Form.Control
              name="impuesto"
              value={formData.impuesto}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Form.Label>Valor Neto</Form.Label>
            <Form.Control
              type="number"
              name="valorNeto"
              value={formData.valorNeto}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <Button variant="outline-success" className="me-2">
              Agregar
            </Button>
            <Button variant="outline-danger">Eliminar</Button>
          </Col>
        </Row>
>>>>>>> f298e1d10e4ac2abeb03653752294b8c31766712

        {/* Pagos */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Forma de Pago"
              name="formaPago"
              value={formData.formaPago}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Valor"
              name="valorPago"
              value={formData.valorPago}
              onChange={handleInputChange}
              type="number"
            />
          </Col>
        </Row>

        {/* Botones de acción */}
        <Row className="mt-4">
          <Col className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductosAereos;
