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

    const [Destination, setDestination] = useState([])
    const [Coins, setCoins] = useState([])
    const [TravelType, setTravelType] = useState([])
    const [Agent, setAgent] = useState([])
    const [Seller, setSeller] = useState([])
    const [validated, setValidated] = useState(false);
    const [fecha] = useState(new Date());
    const today = new Date();

    const [fecha2, setFecha2] = useState(today);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    useEffect(() => {
        //obtener vendedor
        const fetchData = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getSeller(
                    idTravelBranch,
                    token,
                    {}
                );
                console.log('Vendedores', response)
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
                const response = await FacturaService.getAgent(idTravelBranch, token, {});
                console.log("Respuesta Tiqueteadores:", response);

                const Thirdparties = response.data.Thirdparties
                setAgent(Thirdparties)





            } catch (error) {
                console.error("Error en fetchAgent:", error);
            }
        };

        //obtener Tipo viaje

        const fechtTravelType = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getTravelType(idTravelBranch, token, {});
                console.log("Tipo viaje", response)
                const BasicTab = response.data.BasicTab
                setTravelType(BasicTab)

            } catch (error) {
                console.log("Error en fechtTravelType: ", error)
            }
        }

        //obtener moneda
        const fechtCoins = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getCoints(idTravelBranch, token, {});


                const Coins = response.data.Coins
                setCoins(Coins)

            } catch (error) {
                console.log("Error en fechtTravelType: ", error)
            }

        }

        //obtener Destino

        const fecthDestination = async () => {
            const token = localStorage.getItem("Token");
            const idTravelBranch = localStorage.getItem("SucursalId");

            try {
                const response = await FacturaService.getDestination(idTravelBranch, token, {})

                console.log("Tipo destinos:", response)
                const BasicTab = response.data.BasicTab
                setDestination(BasicTab)
            }
            catch (error) {
                console.log("Error en fechtTravelType: ", error)
            }

        }

        fetchData();
        fetchAgent();
        fechtTravelType();
        fechtCoins();
        fecthDestination();
    }, []);

    const maxFecha = new Date();
    maxFecha.setMonth(maxFecha.getMonth() + 1);

    return (
        <Form validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">

                <Form.Group className='form-fecha-factura' as={Col} md="4" controlId="validationCustom01">
                    <Form.Label  >Fecha Factura  </Form.Label>

                    <DatePicker
                        selected={fecha}
                        dateFormat="dd-MM-yyyy"
                        readOnly
                        placeholderText="Fecha"
                    />
                </Form.Group>
                <Form.Group className='form-fecha-factura' as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <DatePicker
                        required
                        selected={fecha2}
                        onChange={(date) => setFecha2(date)}
                        maxDate={maxFecha}

                        placeholder="Fecha"
                        defaultValue="Otto"
                    />
                </Form.Group>

                <Form.Group className='form-vendedor' as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="">Selecciona un trabajador</option>
                        {Agent.map((vendedor) => (
                            <option key={`agent-${vendedor.EmployeeID}`} value={vendedor.EmployeeID}>
                                {vendedor.Name}
                            </option>
                        ))}


                    </Form.Select>
                </Form.Group>


                <Form.Group className='form-tipo-viaje' as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Tipo de viaje</Form.Label>

                    <Form.Select aria-label="Default select example">
                        <option value="">Selecciona un viaje</option>
                        {TravelType.map((travel) => (
                            <option key={`travel-${travel.id}`} value={travel.id}>
                                {travel.Name}
                            </option>
                        ))}

                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group className='form-tipo-moneda' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Moneda</Form.Label>

                    <Form.Select aria-label="Default select example">
                        {Coins.map((coin) => (
                            <option key={`coin-${coin.IataCode}`} value={coin.IataCode}>
                                {coin.Name}
                            </option>
                        ))}


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
                        <option value="">Selecciona un Tiqueteador</option>

                        {Seller.map((vendedor) => (
                            <option key={`agent-${vendedor.EmployeeID}`} value={vendedor.EmployeeID}>
                                {vendedor.Name}
                            </option>
                        ))}


                    </Form.Select>
                </Form.Group>
                <Form.Group className='form-tipo-destino' as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Destino</Form.Label>

                    <Form.Select aria-label="Default select example">
                        <option value="">Selecciona un Destino</option>

                        {Destination.map((Destino) => (
                            <option key={`agent-${Destino.Id}`} value={Destino.Id}>
                                {Destino.Name}
                            </option>
                        ))}


                    </Form.Select>

                </Form.Group>


            </Row>

            <Form.Group 
            className='form-tipo-destino' as={Col} md="6"
            controlId="validationCustom03"
            style={{width:"1300px", height:"300px"}}
            >
                 

                <Form.Label >Observaciones </Form.Label>
                <Form.Control type="text" placeholder="" style = {{ height:"100px" }}/>


            </Form.Group>


        </Form>
    )
}

export default FormDetalles