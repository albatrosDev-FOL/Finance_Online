import React ,{useEffect,useState}from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./Sucursales.css";
import img1 from "/image/sucursales.jpg";
import MenuDes from "../Menu/MenuDes";
import Buttom from "../../../../shared/components/Buttom/Buttom";

import UsuarioService from "../../../../services/UsuarioService";

const Sucursales = () => {

  const navigate = useNavigate();
  const [sucursales, setSucursales] = useState([]); // Estado para guardar las sucursales
  const [error, setError] = useState("");

  const hadleSubmit = (e) => {
    e.preventDefault();
    navigate('/TrazaDoc');

  



  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const strLogin  = localStorage.getItem(id); // Obtener el ID del usuario desde localStorage o sesión
        if (!strLogin ) {
          setError("No se encontró el usuario");
          return;
        }
        const data = await UsuarioService.getSucursalesByUsuario(strLogin);
        setSucursales(data); // Guardar las sucursales en el estado
      } catch (err) {
        setError("Error al cargar las sucursales");
      }
    };

    fetchSucursales();
  }, []);
}

  return (
    <section className="containerS">
      <form onSubmit={hadleSubmit}>
        <img src={img1} className="SucursalImg" />
        <h2> Sucursales</h2>
      <MenuDes sucursales={sucursales} />
        <Buttom type="submit">Entrar</Buttom>
      </form>
    </section>
  );
};
export default Sucursales;
 