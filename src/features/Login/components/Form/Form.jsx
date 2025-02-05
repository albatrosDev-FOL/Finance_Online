import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Buttom from "../../../../shared/components/Buttom/Buttom";
import Input from "../Input/Input";
import UsuarioService from "../../../../services/UsuarioService";
import logoimg from "/image/Login.jpg";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate("/Sucursales");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!formData.UserName || !formData.Password) {
      izitoast.warning({
        title: 'Recordatorio',
        message: 'Por favor, completa todos los campos.',
        position: 'bottomRight',
      });
      return;
    }

    const requestBody = {
      LoginUser: {
        ...formData,
        EndPoint: "string",
        IdCompany: 0,
        IdUser: 0,
        IdSession: 0,
      },
    };

    try {
      const response = await UsuarioService.login_usuario(requestBody);
      console.log("Respuesta del servidor:", response);

      if (response && response.Token) {
        console.log(
          "Inicio de sesión exitoso. Token recibido:",
          response.Token
        );
        localStorage.setItem("Token", response.Token);
        localStorage.setItem("UserName", response.UserName);
        navigate("/Sucursales");
        izitoast.success({
          title: 'Bienvenido',
          message: 'Inicio de sesión exitoso.',
          position: 'bottomRight',
        });
      } else {
        setError("Inicio de sesión fallido. Verifica tus credenciales.");
        izitoast.error({
          title: 'Error',
          message: response.Message,
          position: 'bottomRight',
        });
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      setError("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <section className="register">
      <form onSubmit={handleSubmit}>
        <img src={logoimg} className="logo" alt="Logo" />
        <h2>Usuario</h2>
        <Input
          name="UserName" // Cambiado para coincidir con el backend
          onChange={handleChange}
          value={formData.UserName}
        />
        <h2>Contraseña</h2>
        <Input
          type="password"
          name="Password" // Cambiado para coincidir con el backend
          onChange={handleChange}
          value={formData.Password}
        />
        <a href="#">¿Olvidó su contraseña?</a>
        <Buttom type="submit">Inicio</Buttom>
      </form>
    </section>
  );
};

export default Form;
