import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Buttom from "../../../../shared/components/Buttom/Buttom";
import Input from "../Input/Input";
import UsuarioService from "../../../../services/UsuarioService";
import logoimg from "/image/Login.jpg";
import GroupLogin from "/image/GroupLogin.png";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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

    // ✅ Validación más robusta
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors[0]); // Actualiza estado de error
      izitoast.warning({
        title: 'Validación',
        message: validationErrors[0],
        position: 'bottomRight',
      });
      return;
    }

    // ✅ Manejo de loading state
    setIsLoading(true);

    try {
      const requestBody = {
        LoginUser: {
          ...formData,
          EndPoint: "string",
          IdCompany: 0,
          IdUser: 0,
          IdSession: 0,
        },
      };

      const response = await UsuarioService.login_usuario(requestBody);

      if (response && response.Token) {
        localStorage.setItem("Token", response.Token);
        localStorage.setItem("UserName", response.UserName);
        localStorage.setItem("Agencia", response.AgencyName);

        izitoast.success({
          title: 'Bienvenido',
          message: 'Inicio de sesión exitoso.',
          position: 'bottomRight',
        });

        navigate("/Sucursales");
      } else {
        const errorMsg = response?.Message || "Credenciales incorrectas";
        setError(errorMsg);
        izitoast.error({
          title: 'Error',
          message: errorMsg,
          position: 'bottomRight',
        });
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      const errorMsg = err.response?.data?.message || "Error de conexión";
      setError(errorMsg);
      izitoast.error({
        title: 'Error',
        message: errorMsg,
        position: 'bottomRight',
      });
    } finally {
      // ✅ Siempre quita el loading
      setIsLoading(false);
    }
  };

  // ✅ Función de validación separada
  const validateForm = () => {
    const errors = [];

    if (!formData.UserName?.trim()) {
      errors.push("El usuario es requerido");
    }

    if (!formData.Password?.trim()) {
      errors.push("La contraseña es requerida");
    } else if (formData.Password.length < 3) {
      errors.push("La contraseña debe tener al menos 4 caracteres");
    }

    return errors;
  };

  return (
    <div className="login">

    <div className="container">
           <div className="register">
        <form onSubmit={handleSubmit}>
          <img src={logoimg} className="logo" alt="Logo" />
          <h2>Usuario</h2>
          <Input
            type="text"
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
          <Buttom type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando...' : 'Inicio'}
          </Buttom>
        </form>


    
            </div>



<div className="imgregister">
        <img src={GroupLogin} alt="" />
      </div>



      
    </div>
 



    </div>


  );
};

export default Form;
