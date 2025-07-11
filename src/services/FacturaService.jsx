import axios from "axios";
import { Global } from "../environments/Global";

class FacturaService {
    constructor() {
        this.url = Global.url;
    }

    async postListarFactura(data, token) {
        try {
            const response = await axios.post(
                `${this.url}TravelAgencyBranches/LoadInvoicesByTravelAgencyBranch`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error al listar facturas:", error);
            throw error; // Puedes lanzar el error para manejarlo en el componente que llama a esta función
        }
    }

    async getDetalles(idTravelBranch, token, filters = {}) {
        try {
            const params = {
                idTravelBranch,
                ...filters // Filtros adicionales
            };

            const response = await axios.get(
                `${this.url}Customer/CustomerList`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener detalles:", errorMessage);
            throw new Error("No se pudieron obtener los clientes");
        }
    }




    //sERVICIO para obtener los Vendedores

    async getSeller (travelId, token) {
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}Seller/Sellers`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
        }




        catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }

    //sERVICIO para obtener los tiqueteadores

    async getAgent (travelId, token) {
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}Agent/Agents`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
        }




        catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }

    //sERVICIO para obtener los tipos de  viajes

    async getTravelType(travelId, token) {
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}BasicTable/TravelTypes`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
        }




        catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }

    //Servicio para obtener los tipos de moneda
    
    async getCoints(travelId, token) {
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}BasicTable/Coins`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
        }




        catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }

    async getDestination(travelId,token){
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}BasicTable/Destination`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
        }
           catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }
    async getTmrValue(travelId,token,){
        try {
            const params = {
                travelId
            };

            const response = await axios.get(
                `${this.url}BasicTable/GetTrm`,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response
            console.log( response);
            

        }
           catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }

}




export default new FacturaService();