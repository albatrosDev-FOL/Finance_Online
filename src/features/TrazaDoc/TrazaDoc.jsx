import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from '../../shared/components/NavBar/Navbar'

const TrazaDoc = () => {
  const { id } = useParams(); // Obtén el id de la sucursal desde la URL

  useEffect(() => {
    // Aquí puedes usar el id para hacer una solicitud a la API o realizar otras acciones
    console.log("Sucursal seleccionada:", id);
  }, [id]);
  return (
    <>
    <NavBar/>
    </>
  )
}

export default TrazaDoc