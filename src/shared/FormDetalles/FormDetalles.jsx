import React, { useEffect } from "react";
import { useState } from "react";
import FacturaService from "../../services/FacturaService";
import Button from "react-bootstrap/Button";
import ButtonAgregarItem from "../../shared/components/ButtonAgregarItem/ButtonAgregarItem";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "./FormDetalles.css";
import { format } from "date-fns";

function FormDetalles() {
  const [Destination, setDestination] = useState([]);
  const [Coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [TravelType, setTravelType] = useState([]);
  const [Agent, setAgent] = useState([]);
  const [Seller, setSeller] = useState([]);
  const [validated, setValidated] = useState(false);
  const [trmEditValue, setTrmEditValue] = useState("");
  const [trmData, setTrmData] = useState(null);
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
    // Sincroniza el valor editable cuando cambia trmData
    if (trmData?.Trm?.TrmValue !== undefined) {
      setTrmEditValue(trmData.Trm.TrmValue);
    }
  }, [trmData]);

  useEffect(() => {
    //obtener vendedor
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");

      try {
        const response = await FacturaService.getSeller(idTravelBranch, token, {});
        const thirdparties = response.data.Thirdparties;
        setSeller(thirdparties);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    //obtener tiqueteadores
    const fetchAgent = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");

      try {
        const response = await FacturaService.getAgent(idTravelBranch, token, {});
        const Thirdparties = response.data.Thirdparties;
        setAgent(Thirdparties);
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
        const BasicTab = response.data.BasicTab;
        setTravelType(BasicTab);
      } catch (error) {
        console.log("Error en fechtTravelType: ", error);
      }
    };

    //obtener moneda
    const fechtCoins = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");

      try {
        const response = await FacturaService.getCoints(idTravelBranch, token, {});
        const Coins = response.data.Coins;
        setCoins(Coins);
        
        // Establecer primera moneda como seleccionada por defecto
        if (Coins.length > 0) {
          setSelectedCoin(Coins[0].IataCode);
          await fecthTmr(Coins[0].IataCode);
        }
      } catch (error) {
        console.log("Error al obtener monedas:", error);
      }
    };

    //obtener Destino
    const fecthDestination = async () => {
      const token = localStorage.getItem("Token");
      const idTravelBranch = localStorage.getItem("SucursalId");

      try {
        const response = await FacturaService.getDestination(idTravelBranch, token, {});
        const BasicTab = response.data.BasicTab;
        setDestination(BasicTab);
      } catch (error) {
        console.log("Error en fechtTravelType: ", error);
      }
    };

    fetchData();
    fetchAgent();
    fechtTravelType();
    fechtCoins();
    fecthDestination();
  }, [fecha]);

  const maxFecha = new Date();
  maxFecha.setMonth(maxFecha.getMonth() + 1);

  const fecthTmr = async (coinCode = "USD") => {
    try {
      const token = localStorage.getItem("Token");
      const travelId = localStorage.getItem("SucursalId");
      const fechaFormateada = format(fecha, "dd/MM/yyyy");

      const response = await FacturaService.getTrm(token, {
        trmDate: fechaFormateada,
        TravelAgencyBranchID: travelId,
        CoinIATACode: coinCode,
      });

      setTrmData(response);
    } catch (error) {
      console.error("Error al obtener TRM:", error);
      setTrmData({
        Trm: { TrmValue: 0 },
        Status: -1,
        Message: "Error al cargar TRM",
      });
    }
  };

  const cuerpoModalItem = (
    <Form>
      <Form.Group>
        <Form.Select>
          <option value="Aereo Nacional">Aereo Nacional</option>
          <option value="Aereo Internacional">Aereo Internacional</option>
          <option value="Plan Terceros">Plan Terceros</option>
          <option value="Otros Productos">Otros Productos</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group className="form-fecha-factura" as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Fecha Factura</Form.Label>
          <DatePicker
            selected={fecha}
            dateFormat="dd-MM-yyyy"
            readOnly
            placeholderText="Fecha"
          />
        </Form.Group>
        
        <Form.Group className="form-fecha-factura" as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Fecha Vencimiento</Form.Label>
          <DatePicker
            required
            selected={fecha2}
            onChange={(date) => setFecha2(date)}
            maxDate={maxFecha}
            placeholder="Fecha"
          />
        </Form.Group>

        <Form.Group className="form-vendedor" as={Col} md="4" controlId="validationCustomUsername">
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

        <Form.Group className="form-tipo-viaje" as={Col} md="4" controlId="validationCustomUsername">
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
        <Form.Group className="form-tipo-moneda" as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Moneda</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setSelectedCoin(e.target.value);
              fecthTmr(e.target.value);
            }}
            value={selectedCoin}
          >
            <option value="">Selecciona una moneda</option>
            {Coins.map((coin) => (
              <option key={`coin-${coin.IataCode}`} value={coin.IataCode}>
                {coin.Name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-tipo-trm" as={Col} md="3" controlId="validationCustom04">
          <Form.Label>TMR</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={trmEditValue}
              onChange={(e) => setTrmEditValue(e.target.value)}
              step="0.0001"
              min="0"
            />
            {trmEditValue !== trmData?.Trm?.TrmValue && (
              <Button 
                variant="outline-secondary" 
                onClick={() => setTrmEditValue(trmData?.Trm?.TrmValue || 0)}
                title="Restaurar valor original"
              >
                ↻
              </Button>
            )}
          </InputGroup>
        </Form.Group>
        
        <Form.Group className="form-tipo-oservice" as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Orden de servicio</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
        </Form.Group>

        <Form.Group className="form-tipo-tiqueteador" as={Col} md="6" controlId="validationCustom03">
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
        
        <Form.Group className="form-tipo-destino" as={Col} md="6" controlId="validationCustom03">
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
        className="form-tipo-destino"
        as={Col}
        md="6"
        controlId="validationCustom03"
        style={{ width: "1300px", height: "140px" }}
      >
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          style={{ height: "100px", width: "1480px" }}
        />
      </Form.Group>

      <nav className="navigation-container">
        <button className="navigation-button">Ver Expedientes</button>

        {trmEditValue > 0 ? (
          <ButtonAgregarItem cuerpoModalItem={cuerpoModalItem} />
        ) : (
          <Button variant="secondary" disabled>
            Agregar Item (Porfavor digite la TRM)
          </Button>
        )}

        <button className="navigation-button">Eliminar Item</button>
      </nav>
    </Form>
  );
}

export default FormDetalles;