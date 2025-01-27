import React, { useState , useEffect} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import './MenuDes.css'; // Archivo de estilos corregido


const MenuDes = ({ sucursales }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (sucursal) => {
    setSelectedSucursal(sucursal);
  };

  return (
    <div className="container">
      <Dropdown
        className="select1"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
      >
        <DropdownToggle caret className="dropdown-toggle-custom">
          {selectedSucursal || "Seleccionar una sucursal"}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-custom">
          {sucursales.length > 0 ? (
            sucursales.map((sucursal, index) => (
              <DropdownItem key={index} onClick={() => handleSelect(sucursal)}>
                {sucursal}
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
