import React, { useEffect } from 'react'
import { useState } from 'react';
import FacturaService from '../../services/FacturaService';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import './FormDetalles.css'



function FormDetalles() {
    const [TravelType,setTravelType] = useState([])
    const [Agent, setAgent] = useState([])
    const [Seller, setSeller] = useState([])
    const [validated, setValidated] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [fecha2, setFecha2] = useState(null);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getSeller(
                    idTravelBranch,
                    token,
                    {}
                );
                console.log("Respuesta servidor", response)
                const thirdparties = response.data.Thirdparties
                setSeller(thirdparties)
            }
            catch (error) {
                console.error("Error:", error);


            }
        };

        //obtener tiqueteadores
        const fetchAgent = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getTravelType(idTravelBranch, token, {});
                const basicTab = response.data.BasicTab
                setTravelType(basicTab)

                console.log("Respuesta Tiqueteador", response);

            

            } catch (error) {
                console.error("Error en fetchAgent:", error);
            }
        };

        //obtener Tipo viaje

        const fechtTravelType = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try{
                const response = await FacturaService.getTravelType(idTravelBranch, token, {});
                console.log("Respuesta Viajes",response)

            }catch(error){
                console.log("Error en fechtTravelType: ", error)
            }
        }

        fetchData();
        fetchAgent();
        fechtTravelType();
    }, []);

    return (
        <Form validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className='form-fecha-factura' as={Col} md="4" controlId="validationCustom01">
                    <Form.Label  >Fecha Factura  </Form.Label>

                    <DatePicker
                        required
                        selected={fecha}
                        onChange={(date) => setFecha(date)}
                        placeholder="Fecha"
                        defaultValue="Mark"
                    />
                </Form.Group>
                <Form.Group className='form-fecha-factura' as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <DatePicker
                        required
                        selected={fecha2}
                        onChange={(date) => setFecha2(date)}
                        placeholder="Fecha"
                        defaultValue="Otto"
                    />
                </Form.Group>

                <Form.Group className='form-vendedor' as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="">Selecciona un trabajador</option>
                        {Agent.map((worker) => (
                            <option key={worker.EmployeeID} value={worker.EmployeeID}>
                                {worker.Name}
                            </option>
                        ))}


                    </Form.Select>
                </Form.Group>


                <Form.Group className='form-tipo-viaje' as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Tipo de viaje</Form.Label>

                    <Form.Select aria-label="Default select example">
                        <option>Open this select menu</option>
                        {TravelType.map((worker)=>(
                            <option key={worker.id} value={worker.id}>
                                {worker.Name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group className='form-tipo-moneda' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Moneda</Form.Label>

                    <Form.Select aria-label="Default select example">

                        <option>Moneda</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='form-tipo-trm' as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>TRM</Form.Label>
                    <Form.Control type="text" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='form-tipo-oservice' as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Orden de servicio</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='form-tipo-tiqueteador' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Tiqueteador</Form.Label>

                    <Form.Select aria-label="Default select example">
                        <option value="">Selecciona un trabajador</option>
                        {Seller.map((worker) => (
                            <option key={worker.EmployeeID} value={worker.EmployeeID}>
                                {worker.Name}
                            </option>
                        ))}

                    </Form.Select>
                </Form.Group>
                <Form.Group className='form-tipo-destino' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Destino</Form.Label>

                    <Form.Select aria-label="Default select example">

                        <option>Tiqueteador</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='form-tipo-gds' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>GDS</Form.Label>

                    <Form.Select aria-label="Default select example">

                        <option>Tiqueteador</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Form.Group className='form-tipo-pnr' as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>PNR</Form.Label>
                        <Form.Control type="text" placeholder="State" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form.Group>
            </Row>
         
        </Form>
    )
}

export default FormDetalles