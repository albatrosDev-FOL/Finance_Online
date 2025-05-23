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


    


    async getAgent(travelId,token) {
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
            return response.data
        }

        


        catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error al obtener Agentes:", errorMessage);
            throw new Error("No se pudieron obtener los agentes");
        }
    }



}

export default new FacturaService();