import React from 'react'
import axios from "axios";

import { Global } from "../environments/Global";

class ProductosAereosService {
  constructor() {
    this.url = Global.url;
  }

  // ProductosAereosService.jsx
async getSupplier(token, {idSucursal, IdSubProduct}) {
  try {
      if (!idSucursal || !IdSubProduct) {
        throw new Error("Se requieren ambos IDs: idSucursal e idProductType");
      }

    const response = await axios.get(
      `${this.url}Supplier/SuppliersxProduct/${idSucursal}/${IdSubProduct}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
      console.error("Error al obtener los subproductos:", error);

      let errorMessage = "Error al cargar los productos";
      if (error.response) {
        errorMessage = error.response.data.Message || errorMessage;
      }

      throw new Error(errorMessage);
    }
  }

  async AirportClasses (token){
   try {
    
      const response = await axios.get(`${this.url}BasicTable/AirportClasses`,
         {
        
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error al obtener Agentes:", errorMessage);
      throw new Error("No se pudieron obtener los agentes");
    }
    
  }

}








export default new ProductosAereosService () ;