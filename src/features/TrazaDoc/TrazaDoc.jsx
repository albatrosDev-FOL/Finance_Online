import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from '../../shared/components/NavBar/Navbar';
import './TrazaDoc.css';

const TrazaDoc = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("Sucursal seleccionada:", id);
    }
  }, [id]);

  return (
    <>
      <NavBar />

    </>
  );
};

export default TrazaDoc;