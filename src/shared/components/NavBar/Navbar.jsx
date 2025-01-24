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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
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
                    {toggleMenu && open && (
                      <div className="Desplegable" style={{ marginTop: '10px' }}>
                        <ul>
                          {Menu.map((menu) => (
                            <li key={menu}>{menu}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </a>
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
