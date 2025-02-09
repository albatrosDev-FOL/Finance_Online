import axios from "axios";
import { Global } from "../environments/Global";

class AuthService {
  constructor() {
    this.url = Global.url;
  }

  getToken = () => {
    return localStorage.getItem("Token");
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

      console.log("Respuesta de permisos:", response.data);

      if (
        !response.data.Permissions ||
        !Array.isArray(response.data.Permissions)
      ) {
        console.error("La respuesta de permisos no es válida:", response.data);
        return [];
      }

      return response.data.Permissions.map((permiso) => permiso.Alias);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
      return [];
    }
  }

  async hasPermission(alias) {
    const token = this.getToken();
    if (!token) {
      console.warn("Token no disponible");
      return false;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (!decodedToken.Identity) {
        console.error("El token no contiene 'Identity'");
        return false;
      }

      const identity = JSON.parse(decodedToken.Identity);
      const strLogin = identity.UserName;

      console.log("Usuario obtenido del token:", strLogin);

      const permissions = await this.getUserPermissions(strLogin, token);
      console.log("Permisos obtenidos:", permissions);

      return permissions.includes(alias);
    } catch (error) {
      console.error("Error en hasPermission:", error);
      return false;
    }
  }

  async isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      localStorage.clear();
      return false;
    }
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const strLogin = decodedToken.UserName;
      const permissions = await this.getUserPermissions(strLogin, token);

      if (permissions.length === 0) {
        localStorage.clear();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error verifying authentication:", error);
      localStorage.clear();
      return false;
    }
  }
}

export default new AuthService();
