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
}

export default new FacturaService();