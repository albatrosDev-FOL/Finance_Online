import React from "react";
import "./Sucursales.css";
import img1 from "/image/sucursales.jpg";
import MenuDes from "../Menu/MenuDes";
import Buttom from "../../../../shared/components/Buttom/Buttom";
const Sucursales = () => {
  return (
    <section className="containerS">
      <form>
        <img src={img1} className="SucursalImg" />
        <h2> Sucursales</h2>
        <MenuDes>Seleccionar uno</MenuDes>
        <Buttom>Entrar</Buttom>
      </form>
    </section>
  );
};
export default Sucursales;
