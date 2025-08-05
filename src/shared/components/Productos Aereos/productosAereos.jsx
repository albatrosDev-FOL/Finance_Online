import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";

import ProductosAereosService from "../../../services/ProductosAereosService"


import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import FacturaService from "../../../services/FacturaService";
import "./productosAereos.css"

function ProductosAereos({ selectedProductType, onClose }) {
  const [subProducts, setSubProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSubProduct, setSelectedSubProduct] = useState(1);
  const [suplier, SetSuplier] = useState("")
  const [classes, setclasses] = useState([]);
  const [paymentMethods,setpaymentMethods] = ([])

  const [suppliers, setSuppliers] = useState([]);

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

        console.log("proveedores", data.SubProducts)

        setSubProducts(data.SubProducts || []);
        if (data.SubProducts.length > 0) {
          setSelectedSubProduct(data.SubProducts[0].IdSubProduct.IdProduct);
        }
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


  }, [selectedProductType])




  useEffect(() => {

    const fetchSupplier = async () => {
      if (!selectedSubProduct) return;
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("Token");
      const idSucursal = localStorage.getItem("SucursalId");

      if (!token || !idSucursal || !IdSubProduct) {
        setError("Faltan datos necesarios");
        setLoading(false);
        return;
      }

      try {
        const data = await ProductosAereosService.getSupplier(token, {
          idSucursal,
          IdSubProduct: selectedSubProduct
        });
        setSuppliers(data || []);
        const fetchedSuppliers = Array.isArray(data.Suppliers) ? data.Suppliers : [];
        setSuppliers(fetchedSuppliers);

        console.log("Productos :", data);

        setSuppliers(data.Suppliers || []);
      } catch (error) {
        setError(error.message || "Error al cargar proveedores");
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    };
    if (selectedSubProduct) {
      fetchSupplier();
    }

    setSuppliers([]); // Limpiar proveedores anteriores
    setFormData(prev => ({ ...prev, proveedor: "" })); // Resetear selección
  }, [selectedSubProduct]);


  useEffect(() => {
    const fetchAirportClasses = async () => {
      const token = localStorage.getItem("Token");
      try {

        const response = await ProductosAereosService.AirportClasses(
          token,

        );

        const Classes = response.data.BasicTab;
        setclasses(Classes);
        console.log("clases", Classes)

      } catch (error) {
        console.log("Error en fetchAirportClasses: ", error);
      }
    }
    fetchAirportClasses()
  }, [])

  useEffect(() => {

    const fetchPaymentMethods = async () => {
      const token = localStorage.getItem("Token");
      try {

        const response = await ProductosAereosService.getPaymentMethods(
          token,

        );

        const payMethods = response.data.BasicTab;
        // setclasses(Classes);
        console.log("Metodos de pago", payMethods)

      } catch (error) {
        console.log("Error en fetchPaymentMethods: ", error);
      }
    }


    fetchPaymentMethods()
  },[])



  // 2. Luego define handleInputChange
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


  const tableComponets = [
    { id: "", origen: "ESP", destino: "BGT", fecha: "19/03/2025" },

  ]

  const invoiceColumnstow = [
    {
      name: "",
      selector: row => row.id,
      sortable: true
    },
    {
      name: "Impuesto",
      selector: row => row.id,
      sortable: true
    },
    {
      name: "Valor",
      selector: row => row.id,
      sortable: true
    },

  ]
  const invoiceColumns = [
    {
      name: "",
      selector: row => row.id,
      sortable: true
    },
    {
      name: "Origen",
      selector: row => row.origen,
      sortable: true
    },
    {
      name: "Destino",
      selector: row => row.destino,
      sortable: true
    },
    {
      name: "Fecha",
      selector: row => row.fecha,
      sortable: true
    }
  ];




  return (
    <div className="form-tipo-dre">
      <Form>
        <div className="seccion">
          <Row className="mb-3">
            <Col md={5} className="col-producto">
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
                <Form.Select
                  as="select"
                  name="producto"
                  value={selectedSubProduct}
                  onChange={(e) => setSelectedSubProduct(e.target.value)}
                >
                  <option value="">Seleccione un producto</option>
                  {subProducts.map((product) => (
                    <option key={product.IdSubProduct} value={product.IdSubProduct}>
                      {product.Name}
                    </option>
                  ))}
                </Form.Select>
              )}

              <Form.Label>Proveedor</Form.Label>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                  <span className="ms-2">Cargando proveedores...</span>
                </div>
              ) : error ? (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              ) : (
                <Form.Control
                  as="select"
                  name="proveedor"
                  value={formData.proveedor}
                  onChange={handleInputChange}
                  required
                  disabled // Deshabilitar si no hay producto seleccionado
                >
                  <option value="">Seleccione un proveedor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.IdSupplier} value={supplier.IdSupplier}>
                      {supplier.Name}
                    </option>
                  ))}
                </Form.Control>
              )}





              <Form.Label>Proveedor del servicio</Form.Label>
              <Form.Control />
            </Col>

            <Col md={4} className="col-checkboxes">
              <Form.Check type="checkbox" label="Revisión" />
              <Form.Check type="checkbox" label="Conjunción" />
              <Form.Check type="checkbox" label="Eléctrico" />
            </Col>

            <Col md={3} className="col-tiquete">
              <Form.Label>Tiquete conjuncion</Form.Label>
              <Form.Control />
            </Col>
          </Row>
        </div>

        <div className="form-tipo-dre-seccion">
          <Row className="mb-3">
            <Col md={1}>
              <Form.Label>Serie</Form.Label>
              <Form.Control />
            </Col>
            <Col md={1}>
              <Form.Label>Número</Form.Label>
              <Form.Control />
            </Col>
            <Col md={2}>
              <Form.Label>Tarifa</Form.Label>
              <Form.Control />
            </Col>
            <Col md={2}>
              <Form.Label>Total</Form.Label>
              <Form.Control />
            </Col>
            <Col md={2}>
              <Form.Label>Tarifa extranjera</Form.Label>
              <Form.Control />
            </Col>
            <Col md={2}>
              <Form.Label>Precio Referencia</Form.Label>
              <Form.Control />
            </Col>
            <Col md={2}>
              <Form.Label>Tiq. Promoción</Form.Label>
              <Form.Control />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control />
            </Col>
            <Col md={3}>
              <Form.Label>Nombres</Form.Label>
              <Form.Control />
            </Col>
            <Col md={3}>
              <Form.Label>Razón de viaje</Form.Label>
              <Form.Control />
            </Col>
            <Col md={3}>
              <Form.Label>Tarifa de referencia</Form.Label>
              <Form.Control />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Fecha Reserva</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col md={3}>
              <Form.Label>ID Empleado</Form.Label>
              <Form.Control />
            </Col>
            <Col md={3}>
              <Form.Label>Centro de Costo</Form.Label>
              <Form.Control />
            </Col>
            <Col md={3}>
              <Form.Label>Convenio</Form.Label>
              <Form.Control />
            </Col>
          </Row>

          <div className="vuelo-impuesto">
            <div className="form-tipo-vuelo">
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Origen</Form.Label>
                  <Form.Control placeholder="" />
                </Col>
                <Col md={3}>
                  <Form.Label>Destino</Form.Label>
                  <Form.Control placeholder="" />
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
                  <Form.Control type="date" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Numero de Vuelo</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control />
                </Col>
                <Col md={3}>
                  <Button >Agregar</Button>
                </Col>
              </Row>

              <DataTable
                columns={invoiceColumns}
                data={tableComponets}

              />
            </div>

            <div className="form-tipo-impuesto">
              <Row className="mb-3">
                <Col md={2}>
                  <Form.Label>Impuesto</Form.Label>

                </Col>
                <Col md={9}><Form.Control /></Col>

                <Col md={2}>
                  <Form.Label>Neto</Form.Label>
                  <Form.Control />
                </Col>
                <Col md={2}>
                  <Form.Label>%</Form.Label>
                  <Form.Control />

                </Col>
                <Col md={3}>
                  <Form.Label>     valor</Form.Label>
                  <Form.Control type="text" />
                </Col>


                <Col md={2} className="btn-impuesto">

                  <Button variant="outline-success" className="me-2">Agregar</Button>
                  <Button variant="outline-danger">Eliminar</Button>
                </Col>

                <DataTable
                  columns={invoiceColumnstow}
                  data={tableComponets}

                />



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
      </Form>
    </div>

  );
}

export default ProductosAereos;
