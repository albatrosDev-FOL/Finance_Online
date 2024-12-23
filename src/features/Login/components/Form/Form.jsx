import Buttom from "../../../../shared/components/Buttom/Buttom";
import Input from "../Input/Input";
import React from "react";
import logoimg from "/image/Login.jpg";
import "./Form.css";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <section className="register">
      <form onSubmit={hadleSubmit}>
        <img src={logoimg} className="logo" />

        <h2>Usuario</h2>
        <Input name="usuario" onChange={handleChange} />

        <h2>Contraseña</h2>
        <Input type="password" onChange={handleChange} />

        <a>¿Olvidó su contraseña?</a>

        <Buttom type="submit">Inicio</Buttom>
      </form>
    </section>
  );
};

export default Form;
