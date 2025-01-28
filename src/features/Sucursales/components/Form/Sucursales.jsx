import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sucursales.css";
import img1 from "/image/sucursales.jpg";
import MenuDes from "../Menu/MenuDes";
import Buttom from "../../../../shared/components/Buttom/Buttom";
import UsuarioService from "../../../../services/UsuarioService";

const Sucursales = () => {
  const navigate = useNavigate();
  const [sucursales, setSucursales] = useState([]); // Estado para guardar las sucursales
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      const identity = JSON.parse(parsedPayload.Identity);
      return identity.UserName;
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!selectedSucursal || !selectedSucursal.Id) {
      setError("Por favor selecciona una sucursal");
      return;
    }

    const token = localStorage.getItem("Token");
    const strLogin = decodeToken(token);

    try {
      const response = await UsuarioService.getSucursalesByUsuario(
        strLogin,
        token
      );
      setSucursales(response.TravelAgencyBranches || []);
      const selectedBranch = response.TravelAgencyBranches.find(
        (branch) => branch.Id === selectedSucursal.Id
      );

      if (selectedBranch) {
        localStorage.setItem("Nombre Sucursal", selectedBranch.Name);
      } else {
        console.log("Sucursal no encontrada");
      }
      navigate(`/TrazaDoc/${selectedSucursal.Id}`);
    } catch (err) {
      console.error("Error detallado:", err.response || err.message || err);
    }
  };

  useEffect(() => {
    const loadSucursales = async () => {
      const token = localStorage.getItem("Token");
      const strLogin = decodeToken(token);

      try {
        const response = await UsuarioService.getSucursalesByUsuario(
          strLogin,
          token
        );
        setSucursales(response.TravelAgencyBranches || []);
      } catch (err) {
        console.error("Error al obtener las sucursales:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSucursales();
  }, []);

  return (
    <section className="containerS">
      <form onSubmit={handleSubmit}>
        <img src={img1} className="SucursalImg" alt="Imagen de sucursal" />
        <h2>Sucursales</h2>
        <MenuDes
          sucursales={sucursales}
          value={selectedSucursal ? selectedSucursal.Name : ""}
          onSelectSucursal={setSelectedSucursal}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Buttom type="submit">Entrar</Buttom>
      </form>
    </section>
  );
};

export default Sucursales;
