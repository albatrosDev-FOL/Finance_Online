import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import FacturaService from "../../../services/FacturaService";
import ProductosAereosService from "../../../services/ProductosAereosService";
import "./productosAereos.css";

function ProductosAereos({ selectedProductType, onClose }) {
  // Estados para productos y proveedores
  const [subProducts, setSubProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState({
    products: false,
    suppliers: false,
  });
  const [error, setError] = useState({
    products: null,
    suppliers: null,
  });
  const [selectedSubProduct, setSelectedSubProduct] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

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

  // Datos de ejemplo para las tablas
  const tableComponents = [
    { id: "", origen: "ESP", destino: "BGT", fecha: "19/03/2025" },
  ];

  const invoiceColumns = [
    { name: "", selector: (row) => row.id, sortable: true },
    { name: "Origen", selector: (row) => row.origen, sortable: true },
    { name: "Destino", selector: (row) => row.destino, sortable: true },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
  ];

  const invoiceColumnsTax = [
    { name: "", selector: (row) => row.id, sortable: true },
    { name: "Impuesto", selector: (row) => row.id, sortable: true },
    { name: "Valor", selector: (row) => row.id, sortable: true },
  ];

  // Cargar subproductos cuando cambie el tipo de producto
  useEffect(() => {
    const fetchSubProducts = async () => {
      try {
        setLoading((prev) => ({ ...prev, products: true }));
        setError((prev) => ({ ...prev, products: null }));

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
        
        // Resetear selecciones sin asignar automáticamente el primer producto
        setSelectedSubProduct("");
        setSelectedProductId("");
        setFormData((prev) => ({
          ...prev,
          producto: "",
          proveedor: "",
        }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          products: err.message || "Error al cargar los productos",
        }));
        setSubProducts([]);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    if (selectedProductType) {
      fetchSubProducts();
    }
  }, [selectedProductType]);

  // Cargar proveedores cuando cambie el producto seleccionado
  useEffect(() => {
    const fetchSuppliers = async () => {
      if (!selectedProductId) {
        setSuppliers([]);
        return;
      }

      try {
        setLoading((prev) => ({ ...prev, suppliers: true }));
        setError((prev) => ({ ...prev, suppliers: null }));

        const token = localStorage.getItem("Token");
        const idSucursal = localStorage.getItem("SucursalId");

        const data = await ProductosAereosService.getSupplier(token, {
          idSucursal,
          IdSubProduct: selectedProductId,
        });

        setSuppliers(data.Suppliers || []);

        if (data.Suppliers?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            proveedor: data.Suppliers[0].Id.toString(),
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            proveedor: "",
          }));
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          suppliers: err.message || "Error al cargar proveedores",
        }));
        setSuppliers([]);
      } finally {
        setLoading((prev) => ({ ...prev, suppliers: false }));
      }
    };

    fetchSuppliers();
  }, [selectedProductId]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de producto
  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    
    if (!selectedId) {
      // Si selecciona la opción vacía
      setSelectedSubProduct("");
      setSelectedProductId("");
      setFormData((prev) => ({
        ...prev,
        producto: "",
        proveedor: "",
      }));
      return;
    }

    const selectedProduct = subProducts.find(
      (product) => product.IdSubProduct.toString() === selectedId
    );

    if (selectedProduct) {
      setSelectedSubProduct(selectedId);
      setSelectedProductId(selectedProduct.IdProduct.toString());
      setFormData((prev) => ({
        ...prev,
        producto: selectedId,
        proveedor: "",
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    onClose();
  };

  return (
    <div className="form-tipo-dre">
      <Form onSubmit={handleSubmit}>
        <div className="seccion">
          <Row className="mb-3">
            <Col md={5} className="col-producto">
              <Form.Label>Producto</Form.Label>
              {loading.products ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                  <span className="ms-2">Cargando productos...</span>
                </div>
              ) : error.products ? (
                <Alert variant="danger" className="py-2">
                  {error.products}
                </Alert>
              ) : (
                <Form.Select
                  as="select"
                  name="producto"
                  value={selectedSubProduct}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {subProducts.map((product) => (
                    <option
                      key={product.IdSubProduct}
                      value={product.IdSubProduct.toString()}
                    >
                      {product.Name}
                    </option>
                  ))}
                </Form.Select>
              )}

              <Form.Label>Proveedor</Form.Label>
              {loading.suppliers ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                  <span className="ms-2">Cargando proveedores...</span>
                </div>
              ) : error.suppliers ? (
                <Alert variant="danger" className="py-2">
                  {error.suppliers}
                </Alert>
              ) : (
                <Form.Control
                  as="select"
                  name="proveedor"
                  value={formData.proveedor}
                  onChange={handleInputChange}
                  required
                  disabled={!selectedProductId || suppliers.length === 0}
                >
                  <option value="">Seleccione un proveedor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.Id} value={supplier.Id}>
                      {supplier.FullName || "Proveedor sin nombre"}
                    </option>
                  ))}
                </Form.Control>
              )}

              <Form.Label>Proveedor del servicio</Form.Label>
              <Form.Control
                name="proveedorServicio"
                value={formData.proveedorServicio}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={4} className="col-checkboxes">
              <Form.Check
                type="checkbox"
                label="Revisión"
                name="revision"
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                label="Conjunción"
                name="conjuncion"
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                label="Eléctrico"
                name="electrico"
                onChange={handleInputChange}
              />
            </Col>

            <Col md={3} className="col-tiquete">
              <Form.Label>Tiquete conjuncion</Form.Label>
              <Form.Control
                name="tiqueteConjuncion"
                value={formData.tiqueteConjuncion}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </div>

        <div className="form-tipo-dre-seccion">
          <Row className="mb-3">
            <Col md={1}>
              <Form.Label>Serie</Form.Label>
              <Form.Control
                name="serie"
                value={formData.serie}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={1}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={2}>
              <Form.Label>Tarifa</Form.Label>
              <Form.Control
                name="tarifa"
                value={formData.tarifa}
                onChange={handleInputChange}
                type="number"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                type="number"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Tarifa extranjera</Form.Label>
              <Form.Control
                name="tarifaExtranjera"
                value={formData.tarifaExtranjera}
                onChange={handleInputChange}
                type="number"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Precio Referencia</Form.Label>
              <Form.Control
                name="refPrecio"
                value={formData.refPrecio}
                onChange={handleInputChange}
                type="number"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Tiq. Promoción</Form.Label>
              <Form.Control
                name="promocion"
                value={formData.promocion}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Razón de viaje</Form.Label>
              <Form.Control
                name="razonViaje"
                value={formData.razonViaje}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Tarifa de referencia</Form.Label>
              <Form.Control
                name="tarifaReferencia"
                value={formData.tarifaReferencia}
                onChange={handleInputChange}
                type="number"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Fecha Reserva</Form.Label>
              <Form.Control
                type="date"
                name="fechaReserva"
                value={formData.fechaReserva}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>ID Empleado</Form.Label>
              <Form.Control
                name="idEmpleado"
                value={formData.idEmpleado}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Centro de Costo</Form.Label>
              <Form.Control
                name="centroCosto"
                value={formData.centroCosto}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Convenio</Form.Label>
              <Form.Control
                name="convenio"
                value={formData.convenio}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <div className="vuelo-impuesto">
            <div className="form-tipo-vuelo">
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Origen</Form.Label>
                  <Form.Control
                    name="origen"
                    value={formData.origen}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Destino</Form.Label>
                  <Form.Control
                    name="destino"
                    value={formData.destino}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>Clase</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option value=""></option>
                    {classes.map((clases) => (
                      <option key={`agent-${clases.Id}`} value={clases.Id}>
                        {clases.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaVuelo"
                    value={formData.fechaVuelo}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Numero de Vuelo</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="numeroVuelo"
                    value={formData.numeroVuelo}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={3}>
                  <Button type="button">Agregar</Button>
                </Col>
              </Row>

              <DataTable columns={invoiceColumns} data={tableComponents} />
            </div>

            <div className="form-tipo-impuesto">
              <Row className="mb-3">
                <Col md={2}>
                  <Form.Label>Impuesto</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    name="impuesto"
                    value={formData.impuesto}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col md={2}>
                  <Form.Label>Neto</Form.Label>
                  <Form.Control
                    name="valorNeto"
                    value={formData.valorNeto}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>%</Form.Label>
                  <Form.Control
                    name="porcentajeImpuesto"
                    value={formData.porcentajeImpuesto}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    name="valorImpuesto"
                    value={formData.valorImpuesto}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Col>

                <Col md={2} className="btn-impuesto">
                  <Button
                    variant="outline-success"
                    className="me-2"
                    type="button"
                  >
                    Agregar
                  </Button>
                  <Button variant="outline-danger" type="button">
                    Eliminar
                  </Button>
                </Col>

                <DataTable columns={invoiceColumnsTax} data={tableComponents} />
              </Row>
            </div>
          </div>
        </div>

        <Row className="mb-3 form-pago">
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

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductosAereos;