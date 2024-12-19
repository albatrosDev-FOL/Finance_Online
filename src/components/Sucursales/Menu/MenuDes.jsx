import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import './MenuDes.css'; // Archivo de estilos corregido


const MenuDes = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const abrirCerrarDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <Dropdown className="select1" isOpen={dropdownOpen} toggle={abrirCerrarDropdown}>
        <DropdownToggle caret className="dropdown-toggle-custom">
          Seleccionar Uno
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-custom">
          <DropdownItem>Action 1</DropdownItem>
          <DropdownItem>Action 2</DropdownItem>
          <DropdownItem>Action 3</DropdownItem>
          <DropdownItem>Action 4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MenuDes;
