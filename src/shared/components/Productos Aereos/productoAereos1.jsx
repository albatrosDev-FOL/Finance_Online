import React, { useState, useEffect, useMemo } from "react";
import { Form, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

import imgPagos from "/image/pagos.png";


import { useTrm } from '../../../contexts/contexts'
import { invoiceColumnsTax } from './config/invoicetables'
import { invoiceColumns } from './config/invoicetables'
import { invoiceColumnsPay } from './config/invoicetables'
import AirportSearchModal from "../SearchModalAirport/AirportSearchModal"

import { useProductosAereos } from "./hooks/productosAereoshook";
import "./productosAereos.css";

function ProductoAereos1({ onClose }) {
    const {
        trmEditValue,
        selectedProductType,
        calcularTarifaExtranjera
    } = useTrm();

    const {
        productData,
        loadingStates,
        errors,
        loadInitialData,
        setSelectedProduct,
        loadAirports,

    } = useProductosAereos();


    const [formData, setFormData] = useState({
        proveedor: "",
        proveedorServicio: "",
        clases: "",
        serie: "",
        numeroVuelo: "",
        fechaVuelo: "",
        destino: "",
        origen: "",
        tarifa: "",
        impuesto: "",
        valorImpuesto: "",
        valorNeto: "",
        porcentajeImpuesto: "",
        total: "",
        metodosPago: "",
        valorPago: "",


        //Comprobar cuales se necesitan
        tarifaExtranjera: "",
        refPrecio: "",
        promocion: "",
        apellidos: "",
        nombres: "",
        razonViaje: "",
        tarifaReferencia: "",

        idEmpleado: "",
        centroCosto: "",
        convenio: "",


    });

    const [showModal, setShowModal] = useState(false);
    const [modalField, setModalField] = useState("");

    const [tableTaxes, setTableTaxes] = useState([]);
    const [tableFlights, setTableFlights] = useState([]);
    const [tablePayments, setTablePayments] = useState([]);



    useEffect(() => {
        const selectedTax = productData.taxes.find(
            tax => tax.IdTax.toString() === formData.impuesto
        );

        if (selectedTax) {
            setFormData(prev => ({
                ...prev,
                valorNeto: selectedTax.Neto,
                porcentajeImpuesto: selectedTax.Percent
            }));
        }
    }, [formData.impuesto, productData.taxes]);

    const handleAddFlight = () => {
        const newFlight = {
            origen: formData.origen || "",
            destino: formData.destino || "",
            clases: formData.clases || "",
            fecha: formData.fechaVuelo || "",
            numeroVuelo: formData.numeroVuelo || "",
        };

        setTableFlights(prev => [...prev, newFlight]);

        // Limpiar campos después de agregar
        setFormData(prev => ({
            ...prev,
            origen: "",
            destino: "",
            clases: "",
            fechaVuelo: "",
            numeroVuelo: "",
        }));
    };
    const handleAddTax = () => {

        const selectedTax = productData.taxes.find(
            tax => tax.IdTax.toString() === formData.impuesto
        );


        const newTax = {
            id: tableTaxes.length + 1,
            impuesto: selectedTax ? selectedTax.Name : "Impuesto desconocido",
            valor: parseFloat(formData.valorImpuesto) || 0,
            neto: parseFloat(formData.valorNeto) || 0,
            porcentaje: parseFloat(formData.porcentajeImpuesto) || 0,
        };

        setTableTaxes(prev => [...prev, newTax]);
        setFormData(prev => ({
            ...prev,
            impuesto: "",
            valorImpuesto: "",
            valorNeto: "",
            porcentajeImpuesto: "",
        }));
    }

    const handleDataTablepay = () => {

        const selectedPaymentMethod = productData.paymentMethods.find(
            method => method.Id.toString() === formData.metodosPago
        );

        const newPayment = {
            id: tablePayments.length + 1,
            formaPago: selectedPaymentMethod ? selectedPaymentMethod.Name : "Método desconocido",
            valor: parseFloat(formData.valorPago) || 0,
        }

        setTablePayments(prev => [...prev, newPayment]);

        setFormData(prev => ({
            ...prev,
            metodosPago: "",
            valorPago: ""
        }));


    }


    const handleCloseModal = () => setShowModal(false);


    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    useEffect(() => {
        if (selectedProductType) {
            loadAirports();
        }
    }, [selectedProductType, loadAirports]);

    // ✅ Función helper para obtener aeropuertos
    const getAirportsForField = (field) => {
        if (selectedProductType === 1) {
            // Nacional: origen y destino nacionales
            return productData.nationalAirports;
        } else {
            return productData.internationalAirports; // Destino internacional

        }
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        console.log("🔄 Producto seleccionado - productId:", productId);


        const selectedProduct = productData.products.find(
            product => product.IdSubProduct.toString() === productId
        );
        if (selectedProduct) {

            setSelectedProduct(
                selectedProduct.IdSubProduct,
                selectedProduct.IdSubProduct    // Para impuestos
            );


            setFormData(prev => ({
                ...prev,
                proveedor: "",
                proveedorServicio: "",
                productType: selectedProduct.IdSubProduct,
                impuestos: "",
                tarifa: "",
                tarifaExtranjera: "",
            }));
        }


    };

    const handleInputChangeProveedor = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        onClose();
    };

    const LoadingSpinner = ({ message }) => (
        <div className="text-center py-2">
            <Spinner animation="border" size="sm" />
            <span className="ms-2">{message}</span>
        </div>
    );

    const ErrorAlert = ({ error }) => (
        <Alert variant="danger" className="py-2 mb-2">
            <small>{error}</small>
        </Alert>
    );

    // ✅ FUNCIÓN ESPECÍFICA PARA CAMPOS DEL FORMULARIO
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if ((name === "origen" || name === "destino") && value.length === 3) {
            setModalField(name);
            setShowModal(true);
        }


        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    //Cálculo automático de tarifa extranjera cuando cambia tarifa o TRM
    useEffect(() => {
        if (!formData.tarifa || trmEditValue <= 0) {
            setFormData(prev => ({
                ...prev,
                tarifaExtranjera: ""
            }));
            return;
        }

        const tarifaExtranjera = calcularTarifaExtranjera(formData.tarifa);

        setFormData(prev => ({
            ...prev,
            tarifaExtranjera
        }));

        console.log("📊 Cálculo TRM:", {
            tarifa: formData.tarifa,
            trm: trmEditValue,
            resultado: tarifaExtranjera
        });



    }, [formData.tarifa, trmEditValue, calcularTarifaExtranjera,]);


    const tableData = useMemo(() => {
        if (tableFlights.length === 0) {
            return [{
                id: 0,
                origen: "",
                destino: "",
                clases: "",
                fecha: "",
                numeroVuelo: "",
                isEmpty: true
            }];
        }
        return tableFlights.map((flight, index) => ({
            ...flight,
            id: index + 1 // Asegurar ID único
        }));
    }, [tableFlights]);



    const taxTableData = useMemo(() => {
        if (tableTaxes.length === 0) {
            return [{
                id: 0,
                impuesto: "",
                valor: "",
                neto: "",
                porcentaje: "",
                isEmpty: true
            }];
        }
        return tableTaxes;
    }, [tableTaxes]);

    const paymentTableData = useMemo(() => {
        if (tablePayments.length === 0) {
            return [{
                id: 0,
                formaPago: "",
                valor: "",
                isEmpty: true
            }];
        }
        return tablePayments;
    }, [tablePayments]);

    const totalCalculado = useMemo(() => {
        const tarifa = parseFloat(formData.tarifa) || 0;
        const valor = parseFloat(formData.valorImpuesto) || 0;
        return (tarifa + valor).toString();
    }, [formData.tarifa, formData.valorImpuesto]);



    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            total: totalCalculado
        }));
    }, [totalCalculado]);





    return (
        <div className="form-producto-aereo">
            <Form onSubmit={handleSubmit}>
                <div className="seccion">
                    <Row>
                        {/* Columna de Productos y Proveedores */}
                        <Col md={5} className="col-producto">

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Producto
                                </Form.Label>
                                {loadingStates.products ? (
                                    <LoadingSpinner message="Cargando productos..." />
                                ) : errors.products ? (
                                    <ErrorAlert error={errors.products} />
                                ) : (
                                    <Form.Select
                                        name="producto"

                                        value={productData.selectedProductId}
                                        onChange={handleProductChange}
                                        required
                                        className={errors.products ? 'is-invalid' : ''}
                                    >
                                        <option value="">Seleccione un producto</option>
                                        {productData.products.map((product) => (
                                            <option
                                                key={`product-${product.IdSubProduct}`}
                                                value={product.IdSubProduct.toString()}
                                            >
                                                {product.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Proveedor <span className="text-danger">*</span>
                                </Form.Label>
                                {loadingStates.suppliers ? (
                                    <LoadingSpinner message="Cargando proveedores..." />
                                ) : errors.suppliers ? (
                                    <ErrorAlert error={errors.suppliers} />
                                ) : (
                                    <Form.Select
                                        name="proveedor"
                                        value={formData.proveedor}
                                        onChange={handleInputChangeProveedor}
                                        required
                                        disabled={!productData.selectedProductId || productData.suppliers.length === 0}
                                    >
                                        <option value="">Seleccione un proveedor</option>
                                        {productData.suppliers.map((supplier) => (
                                            <option key={`supplier-${supplier.Id}`} value={supplier.Id}>
                                                {supplier.FullName || "Proveedor sin nombre"}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Proveedor de servicio <span className="text-danger">*</span>
                                </Form.Label>
                                {loadingStates.suppliers ? (
                                    <LoadingSpinner message="Cargando proveedores..." />
                                ) : errors.suppliers ? (
                                    <ErrorAlert error={errors.suppliers} />
                                ) : (
                                    <Form.Select
                                        name="proveedorServicio"
                                        value={formData.proveedorServicio}
                                        onChange={handleInputChangeProveedor}
                                        required
                                    >
                                        <option value="">Seleccione un proveedor</option>
                                        {productData.suppliers.map((supplier) => (
                                            <option key={`supplier-${supplier.Id}`} value={supplier.Id}>
                                                {supplier.FullName || "Proveedor sin nombre"}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </Form.Group>


                        </Col>

                        <Col md={4} style={{ paddingTop: "92px", paddingLeft: "80px" }}>
                            <Form.Check
                                type="checkbox"
                                id="checkbox-revision"
                                label="Revisión"
                                name="revision"
                                checked={formData.revision || false}
                                onChange={handleInputChange}
                                className="mb-2"
                            />

                            <Form.Check
                                type="checkbox"
                                id="checkbox-conjuncion"
                                label="Conjunción"
                                name="conjuncion"
                                checked={formData.conjuncion || false}
                                onChange={handleInputChange}
                                className="mb-2"
                            />

                            <Form.Check
                                type="checkbox"
                                id="checkbox-electrico"
                                label="Electrónico"
                                name="electrico"
                                checked={formData.electrico || false}
                                onChange={handleInputChange}
                                className="mb-2"
                            />

                            {/*  INDICADOR VISUAL DE OPCIONES ACTIVAS
                                        {(formData.revision || formData.conjuncion || formData.electrico) && (
                                          <div >
                                            <small className="text-success">
                                              <strong> Opciones activas:</strong>
                                              <ul className="mb-0 mt-1">
                                                {formData.revision && <li>Tiquete requiere revisión</li>}
                                                {formData.conjuncion && <li>Tiquete de conjunción</li>}
                                                {formData.electrico && <li>Tiquete electrónico</li>}
                                              </ul>
                                            </small>
                                          </div>
                                        )} */}

                        </Col>

                        <Col md={3} className="col-tiquete" style={{ paddingTop: "92px" }}>
                            <Form.Label className={formData.conjuncion ? "fw-bold text-primary" : ""}>
                                Tiquete conjunción
                                {formData.conjuncion && <span className="text-danger"> *</span>}
                            </Form.Label>
                            <Form.Control
                                name="tiqueteConjuncion"
                                value={formData.tiqueteConjuncion || ''}
                                onChange={handleInputChange}
                                placeholder={formData.conjuncion ? "Requerido para conjunción" : "Opcional"}
                                disabled={!formData.conjuncion}
                                className={formData.conjuncion && !formData.tiqueteConjuncion ? 'border-warning' : ''}
                            />
                            {formData.conjuncion && !formData.tiqueteConjuncion && (
                                <Form.Text className="text-warning">
                                    ⚠️ Campo requerido
                                </Form.Text>
                            )}
                            {formData.conjuncion && formData.tiqueteConjuncion && (
                                <Form.Text className="text-success">
                                    Tiquete conjunción configurado
                                </Form.Text>
                            )}
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
                                type="text"
                            />
                        </Col>
                        <Col md={2}>
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                name="total"
                                value={totalCalculado}
                                onChange={handleInputChange}
                                type="number"
                                disabled
                            />
                        </Col>


                        <Col md={2}>
                            <Form.Label>Tarifa Extranjera</Form.Label>
                            <Form.Control
                                name="tarifaExtranjera"
                                value={formData.tarifaExtranjera}
                                onChange={handleInputChange}
                                type="text"
                                readOnly // Solo lectura ya que se calcula automáticamente
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
                        <Col md={2}>
                            <Form.Label>Razón de viaje</Form.Label>
                            <Form.Control
                                name="razonViaje"
                                value={formData.razonViaje}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col md={2}>
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


                </div>

                <div className="vuelo-impuesto">
                    <div className="form-tipo-vuelo">
                        <Row className="mb-3">
                            <Col md={2}>
                                <Form.Label>Origen</Form.Label>
                                <Form.Control

                                    name="origen"
                                    value={formData.origen}
                                    onChange={handleInputChange}
                                    required
                                >

                                </Form.Control>



                            </Col>


                            <Col md={2}>
                                <Form.Label>Destino</Form.Label>
                                <Form.Control
                                    name="destino"
                                    value={formData.destino}
                                    onChange={handleInputChange}
                                    required
                                >

                                </Form.Control>
                            </Col>


                            <AirportSearchModal
                                show={showModal}
                                onClose={handleCloseModal}
                                airports={getAirportsForField(modalField)}

                                field={modalField}
                                isLoading={
                                    modalField === 'origen'
                                        ? loadingStates.nationalAirports
                                        : loadingStates.internationalAirports
                                }
                                error={
                                    modalField === 'origen'
                                        ? errors.nationalAirports
                                        : errors.internationalAirports
                                }
                                onSelectAirport={(airport, field) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [field]: `${airport.IATACode}`
                                    }))
                                }
                            />

                            <Col md={4}>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaVuelo"
                                    value={formData.fechaVuelo}
                                    onChange={handleInputChange}
                                />
                            </Col>


                            <Col md={2}>
                                <Form.Label>Clase</Form.Label>
                                <Form.Select
                                    name="clases"
                                    aria-label="Default select example"
                                    value={formData.clases}
                                    onChange={handleInputChange}
                                >
                                    <option value=""></option>
                                    {productData.classes.map((clases) => (
                                        <option key={`agent-${clases.Id}`} value={clases.Name}>
                                            {clases.Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Label>Numero de Vuelo</Form.Label>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    name="numeroVuelo"
                                    value={formData.numeroVuelo}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant="outline-success"
                                    className="me-2"
                                    type="button"
                                    onClick={handleAddFlight}  // ✅ AGREGAR onClick
                                >
                                    Agregar
                                </Button>

                            </Col>



                            <Col md={4}>

                                <Button
                                    variant="outline-danger"
                                    type="button"
                                    onClick={() => setTableFlights([])}  // ✅ AGREGAR onClick para limpiar todo
                                >
                                    Limpiar Todo
                                </Button>

                            </Col>
                        </Row>
                        <div className="form-tipo-vuelo-table" style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>

                            <DataTable
                                className="productos-tax-table"
                                columns={invoiceColumns}
                                data={tableData}
                                highlightOnHover
                                striped
                                dense
                                noDataComponent={<div style={{ padding: '20px' }}>Agregue vuelos para ver datos</div>}
                                fixedHeader={true}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        },
                                    },
                                }}
                            />
                        </div>

                    </div>

                    <div className="form-tipo-impuesto">
                        <Row className="mb-3" style={{ marginTop: '20px' }}>
                            <Col md={2}>
                                <Form.Label>Impuesto</Form.Label>

                            </Col>
                            <Col md={10}>
                                {loadingStates.taxes ? (
                                    <LoadingSpinner message="Cargando impuestos..." />
                                ) : errors.taxes ? (
                                    <ErrorAlert error={errors.taxes} />
                                ) : (
                                    <Form.Select
                                        name="impuesto"
                                        value={formData.impuesto}
                                        onChange={handleInputChange}
                                        required

                                    >
                                        <option value="">Seleccione un impuesto</option>
                                        {productData.taxes.map((tax) => (
                                            <option
                                                key={`product-${tax.IdTax}`}
                                                value={tax.IdTax.toString()}
                                            >
                                                {tax.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
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

                            <Col md={2} className="btn-impuesto-pago" >
                                <Col md={2} style={{ paddingTop: '32px' }}>
                                    <Button
                                        variant="outline-success"
                                        className="me-2"
                                        type="button"
                                        onClick={handleAddTax}  // ✅ AGREGAR onClick
                                    >
                                        Agregar
                                    </Button>

                                </Col>
                            </Col>
                            <div className="form-tipo-impuesto-table" style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', marginTop: '12px' }}>
                                <DataTable

                                    className="productos-tax-table"
                                    columns={invoiceColumnsTax}
                                    data={taxTableData}
                                    highlightOnHover
                                    striped
                                    dense
                                    noDataComponent={<div style={{ padding: '20px' }}>Agregue vuelos para ver datos</div>}
                                    fixedHeader={true}
                                    customStyles={{
                                        headCells: {
                                            style: {
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                            },
                                        },
                                    }}
                                />
                            </div>


                        </Row>
                    </div>
                </div>

                <div className="form-tipo-dre-seccion-pay" >
                    <div className="form-tipo-form">

                        <Row className="mb-3 form-pago">
                            <Col md={2}>
                                <Form.Label>Forma de Pago</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="metodosPago"
                                    value={formData.metodosPago}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=""></option>
                                    {productData.paymentMethods.map((metodos) => (
                                        <option key={`agent-${metodos.Id}`} value={metodos.Id}>
                                            {metodos.Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    placeholder="Valor"
                                    name="valorPago"
                                    value={formData.valorPago}
                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Col>

                            <Col md={2} style={{ paddingTop: '32px',width: '100px' }}>
                                <Button
                                    variant="outline-success"
                                    className="me-2"
                                    type="button"
                                    onClick={handleDataTablepay}  // ✅ AGREGAR onClick
                                >
                                    Agregar
                                </Button>

                            </Col>
                           




                        </Row>




                        <Row className="mb-3 form-pago">

                            
                            <Col md={2}>
                                <Form.Control

                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Col>

                             <Col md={2} style={{ marginLeft: '170px' }}>
                                <Button
                                    variant="outline-danger"
                                    type="button"
                                    onClick={() => setTablePayments([])}  // ✅ AGREGAR onClick para limpiar todo
                                >
                                    Limpiar Todo
                                </Button>
                            </Col>


                        </Row>

                        <Row>
                            <Col md={2}>
                                <Form.Control

                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Col>
                            <Col md={1} style={{ width: '68px', height: '30px', }}>
                                <Button type="button" className="imgimpuesto" style={{ width: '38px', height: '30px', padding: '0' }}>
                                    <img src={imgPagos} alt="imgimpuesto" className="img-fluid" style={{ width: '38px', height: '30px' }} />
                                </Button>

                            </Col>
                            <Col md={1}>
                                <Form.Label>Voucher</Form.Label>
                                <Form.Control
                                    placeholder=""

                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Label>Autorizacion</Form.Label>
                                <Form.Control

                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Col>
                        
                        

                            <Col>
                                <div className="form-pagos-table" style={{ backgroundColor: '#72c3e3a8',  borderRadius: '5px', marginBottom: '20px', marginLeft: '20px' }}>

                                    <DataTable
                                        className="productos-tax-table"
                                        columns={invoiceColumnsPay}
                                        data={paymentTableData}
                                        highlightOnHover
                                        striped
                                        dense
                                        noDataComponent={<div style={{ padding: '20px' }}>Agregue vuelos para ver datos</div>}
                                        fixedHeader={true}
                                        customStyles={{
                                            headCells: {
                                                style: {
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                            </Col>


                        </Row>



                    </div>



                </div>




            </Form>
        </div>
    );



}

export default ProductoAereos1;