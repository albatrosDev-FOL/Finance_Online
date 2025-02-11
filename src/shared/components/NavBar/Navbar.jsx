import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "./Navbar.css";
import imgConta from "/image/contabilidad.png";
import imgCartera from "/image/Cartera.png";
import imgInformes from "/image/informes.png";
import imgPagos from "/image/pagos.png";
import imgVentas from "/image/ventas.png";
import imgAdministracion from "/image/administracion.png";
import imgTesoreria from "/image/tesoreria.png";
import imgPerfil from "/image/perfil.png";
import imgHome from "/image/home.png";
import authService from "../../../services/authService";

const Navbar = () => {
  const [openVentas, setOpenVentas] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);
  const navigate = useNavigate();

  const MenuVentas = ["Productos", "Clientes", "Pedidos", "Facturas"];

  const userName = localStorage.getItem("UserName");
  const sucursalName = localStorage.getItem("Nombre Sucursal");

  const MenuPerfil = [
    { name: true, icon: "/image/logoverde.png", isLogo: true },
    { name: userName || "Nombre", icon: "/image/iconose.png" },
    { name: sucursalName || "Sucursal", icon: "/image/iconose.png" },
    { name: "Agencia", icon: "/image/iconose.png" },
    { name: "Salir", icon: "/image/salir2.png" },
  ];

  const handleLogout = () => {
    document.body.classList.add("blur-background");

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#025959",
      cancelButtonColor: "#597589",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      background: "rgba(224, 241, 255, 0.61)",
      customClass: {
        popup: "custom-swal-popup",
      },
    }).then((result) => {
      document.body.classList.remove("blur-background");

      if (result.isConfirmed) {
        localStorage.removeItem("Token");
        localStorage.removeItem("UserName");
        localStorage.removeItem("Nombre Sucursal");
        localStorage.removeItem("SucursalId");
        navigate("/");

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado la sesión correctamente.",
          icon: "success",
          background: "#141e34", 
          confirmButtonColor: "#597589", 
          customClass: {
            popup: "custom-swal-popup", 
            title: "custom-swal-title", 
            htmlContainer: "custom-swal-text", 
          },
        });
      }
    });
  };

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);

      if (!parsedPayload.Identity) {
        console.error("El token no contiene 'Identity'");
        return null;
      }

      const identity = JSON.parse(parsedPayload.Identity);
      return identity.UserName;
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      return null;
    }
  };

  const handleFacturasClick = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("Token no encontrado en localStorage");
      return;
    }

    const strLogin = decodeToken(token);
    if (!strLogin) {
      console.error("No se pudo obtener el usuario del token");
      return;
    }

    const hasPermission = await authService.hasPermission("mnuInvoice");
    console.log("¿Tiene permiso para mnuInvoice?:", hasPermission);

    if (hasPermission) {
      navigate("/ListadoFacturacion");
    } else {
      Swal.fire({
        title: "Acceso denegado",
        text: "No tienes permisos para acceder a Facturas.",
        icon: "warning",
        confirmButtonColor: "#025959",
        background: "rgba(224, 241, 255, 0.61)",
        customClass: {
          popup: "custom-swal-popup",
        },
      }
      );
      izitoast.warning({
        title: "Advertencia",
        message: 'Acceso denegado", "No tienes permisos para acceder a Facturas.',
        position: "bottomRight",
      });
    }
  };

  return (
    <div className="containerOne">
      <div className="containerTwo">
        <div className="container">
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {[
              { src: imgHome, alt: "Inicio", label: "" },
              {
                src: imgAdministracion,
                alt: "Administración",
                label: "Administración",
              },
              {
                src: imgVentas,
                alt: "Ventas",
                label: "Ventas",
                toggleMenu: true,
                setOpen: setOpenVentas,
                openState: openVentas,
                menuItems: MenuVentas,
              },
              { src: imgTesoreria, alt: "Tesorería", label: "Tesorería" },
              { src: imgPagos, alt: "Pagos", label: "Pagos" },
              { src: imgConta, alt: "Contabilidad", label: "Contabilidad" },
              { src: imgCartera, alt: "Cartera", label: "Cartera" },
              { src: imgInformes, alt: "Informes", label: "Informes" },
              {
                src: imgPerfil,
                alt: "Perfil",
                label: "",
                toggleMenu: true,
                setOpen: setOpenPerfil,
                openState: openPerfil,
                menuItems: MenuPerfil,
              },
            ].map(
              (
                { src, alt, label, toggleMenu, setOpen, openState, menuItems },
                index
              ) => (
                <div
                  key={index}
                  className="col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onClick={toggleMenu ? () => setOpen(!openState) : undefined}
                  >
                    <img
                      src={src}
                      alt={alt}
                      style={{
                        marginBottom: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    {label && <span>{label}</span>}
                  </div>
                  {toggleMenu && openState && (
                    <div
                      className="Desplegable"
                      style={{
                        position: "absolute",
                        top: "120%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#141e34",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "30px",
                        padding: "10px 20px",
                        zIndex: "100",
                        width: "150px",
                      }}
                    >
                      <div
                        style={{
                          content: '""',
                          position: "absolute",
                          top: "-12px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "29px",
                          height: "0px",
                          borderLeft: "12px solid transparent",
                          borderRight: "12px solid transparent",
                          borderBottom: "12px solid #141e34",
                          zIndex: "101",
                        }}
                      />
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {menuItems.map((item, index) => {
                          const isObject = typeof item === "object";
                          const isLogo = item.isLogo;

                          return (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                color: "white",
                                textAlign: isLogo ? "center" : "left",
                                display: "flex",
                                flexDirection:
                                  isObject && item.name === "Salir"
                                    ? "column"
                                    : "none",
                                alignItems: "center",
                                marginBottom: "14px",
                              }}
                              onClick={
                                item.name === "Salir"
                                  ? handleLogout
                                  : item === "Facturas"
                                  ? handleFacturasClick
                                  : () =>
                                      console.log(
                                        `Clicked on ${
                                          isObject ? item.name : item
                                        }`
                                      )
                              }
                            >
                              {isObject && !isLogo && (
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  style={{
                                    marginBottom: "2px",
                                    width: "30px",
                                    height: "30px",
                                    filter:
                                      item.name === "Salir"
                                        ? "invert(64%) sepia(44%) saturate(1625%) hue-rotate(154deg) brightness(96%) contrast(92%)"
                                        : "none",
                                  }}
                                />
                              )}
                              {isLogo && (
                                <img
                                  src={item.icon}
                                  alt="Logo"
                                  style={{
                                    marginBottom: "1px",
                                    width: "60px",
                                    height: "50px",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    filter:
                                      "invert(100%) brightness(100%) contrast(100%) saturate(0%)",
                                  }}
                                />
                              )}
                              <span style={{ fontSize: "14px" }}>{isObject ? item.name : item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
