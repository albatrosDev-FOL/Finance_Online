import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./Sucursales.css";
import img1 from "/image/sucursales.jpg";
import MenuDes from "../Menu/MenuDes";
import Buttom from "../../../../shared/components/Buttom/Buttom";
import { useSucursales } from "../../../../hooks/useSucursalesHook";


const Sucursales = () => {
  const navigate = useNavigate();
  const [selectedSucursal, setSelectedSucursal] = useState(null);


  const { sucursales, loading, error, loadSucursales } = useSucursales();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!selectedSucursal?.Id) {
      izitoast.warning({
        title: 'Recordatorio',
        message: 'Por favor selecciona una sucursal.',
        position: 'bottomRight',
      });
      return;
    }

    // Solo guardamos y navegamos (sin lógica duplicada)
    localStorage.setItem("Nombre Sucursal", selectedSucursal.Name);
    localStorage.setItem("SucursalId", selectedSucursal.Id);
    navigate(`/TrazaDoc/${selectedSucursal.Id}`);
  };


 

  useEffect(() => {
    const nombreSucursal = localStorage.getItem("Nombre Sucursal");
    const sucursalId = localStorage.getItem("SucursalId");

    if (nombreSucursal && sucursalId) {
      navigate(`/TrazaDoc/${sucursalId}`);
    }
  }, [navigate]);

  // Manejo de estados de carga y error
  if (loading) {
    return (
      <section className="containerS">
        <div>Cargando sucursales...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="containerS">
        <div>Error: {error}</div>
        <button onClick={loadSucursales}>Reintentar</button>
      </section>
    );
  }

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
        <Buttom type="submit" disabled={loading || !selectedSucursal}>Entrar</Buttom>
      </form>
    </section>

   
  );
};

export default Sucursales;