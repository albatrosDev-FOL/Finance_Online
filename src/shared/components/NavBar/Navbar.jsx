import React, { useState } from "react";
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

const Navbar = () => {
  const [openVentas, setOpenVentas] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);

  const MenuVentas = ["Productos", "Clientes", "Pedidos", "Facturas"];
  const MenuPerfil = [
    { name: true, icon: "/image/logoverde.png", isLogo: true },
    { name: "Nombre", icon: "/image/iconose.png" },
    { name: "Sucursal", icon: "/image/iconose.png" },
    { name: "Agencia", icon: "/image/iconose.png" },
    { name: "Salir", icon: "/image/salir2.png" },
  ];

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
                          // Determina si el ítem es un string o un objeto
                          const isObject = typeof item === "object";
                          const isLogo = item.isLogo;

                          return (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                color: "white", // Color para "Salir"
                                textAlign: isLogo ? "center" : "left", // Centrado solo para el logo
                                display: "flex",
                                flexDirection:
                                  isObject && item.name === "Salir"
                                    ? "column"
                                    : "none", // Ícono arriba y texto abajo solo para "Salir"
                                alignItems: "center", // Alineación centrada
                                marginBottom: "14px", // Espaciado entre ítems
                              }}
                              onClick={
                                () =>
                                  console.log(
                                    `Clicked on ${isObject ? item.name : item}`
                                  ) // Maneja el click
                              }
                            >
                              {/* Ícono solo si el ítem es un objeto */}
                              {isObject && !isLogo && (
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  style={{
                                    marginBottom: "2px", // Espacio entre ícono y texto
                                    width: "30px", // Tamaño para los íconos
                                    height: "30px", // Tamaño para los íconos
                                    filter:
                                      item.name === "Salir"
                                        ? "invert(64%) sepia(44%) saturate(1625%) hue-rotate(154deg) brightness(96%) contrast(92%)" // Color para "Salir"
                                        : "none",
                                  }}
                                />
                              )}
                              {/* Logo, solo si es un logo */}
                              {isLogo && (
                                <img
                                  src={item.icon}
                                  alt="Logo"
                                  style={{
                                    marginBottom: "1px", // Espacio entre ícono y texto
                                    width: "60px", // Tamaño para el logo
                                    height: "50px", // Tamaño para el logo
                                    display: "block", // Asegura que se muestre como bloque
                                    marginLeft: "auto", // Centra el logo
                                    marginRight: "auto", // Centra el logo
                                    filter: "invert(100%) brightness(100%) contrast(100%) saturate(0%)",
                                  }}
                                />
                              )}
                              {/* Texto debajo del ícono */}
                              <span>{isObject ? item.name : item}</span>
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