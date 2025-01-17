import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./Sucursales.css";
import img1 from "/image/sucursales.jpg";
import MenuDes from "../Menu/MenuDes";
import Buttom from "../../../../shared/components/Buttom/Buttom";
const Sucursales = () => {

  const navigate = useNavigate();

  const hadleSubmit = (e) => {
    navigate('/TrazaDoc');
  };

  return (
    <section className="containerS">
      <form onSubmit={hadleSubmit}>
        <img src={img1} className="SucursalImg" />
        <h2> Sucursales</h2>
        <MenuDes>Seleccionar uno</MenuDes>
        <Buttom type="submit">Entrar</Buttom>
      </form>
    </section>
  );
};
export default Sucursales;
