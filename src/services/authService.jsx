import axios from "axios";
import { Global } from "../environments/Global";

class AuthService {
    constructor() {
        this.url = Global.url;
    }


    getToken = () => {
        return localStorage.getItem('Token');
    };

    async getUserPermissions(strLogin, token) {
        try {
            const response = await axios.get(
                `${this.url}TravelAgencyBranches/PermissionbyLogin?strLogin=${strLogin}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userPermissions = response.data.Permissions.map((permiso) => permiso.Alias);

            return userPermissions;
        } catch (error) {
            console.error("Error al obtener permisos:", error);
            return [];
        }
    }

    async hasPermission(alias) {
        const permissions = await this.getUserPermissions(); // Obtener permisos desde la API
        return permissions.includes(alias); // Verificar si el permiso existe
    }

    async isAuthenticated() {
        const token = this.getToken();
        if (!token) {
            localStorage.clear();
            return false;
        }
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const strLogin = decodedToken.UserName;
            const permissions = await this.getUserPermissions(strLogin, token);

            if (permissions.length === 0) {
                localStorage.clear();
                return false;
            }

            return true;

        } catch (error) {
            console.error('Error verifying authentication:', error);
            localStorage.clear();
            return false;
        }


    }
}

export default new AuthService();
