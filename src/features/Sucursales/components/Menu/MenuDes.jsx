import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuDes.css"; // Archivo de estilos corregido

const MenuDes = ({ sucursales, value, onSelectSucursal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (sucursal) => {
    onSelectSucursal(sucursal);
  };

  return (
    <div className="container">
      <Dropdown
        className="select1"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
      >
        <DropdownToggle caret className="dropdown-toggle-custom">
          {value || "Seleccionar una sucursal"}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-custom">
          {sucursales.length > 0 ? (
            sucursales.map((sucursal) => (
              <DropdownItem key={sucursal.Id} onClick={() => handleSelect(sucursal)}>
                {sucursal.Name}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>No hay sucursales disponibles</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};


export default MenuDes;
