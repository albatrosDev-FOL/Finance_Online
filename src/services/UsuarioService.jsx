import axios from "axios";
import { Global } from "../environments/Global";

class UsuarioService {
  constructor() {
    this.url = Global.url;
  }

  async login_usuario(data) {
    try {
      const response = await axios.post(
        `${this.url}Login/Validate?company=1`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error en url:", error.response || error.message);
      throw error;
    }
  }

  // getToken() {
  //   if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  //     return localStorage.getItem('Token');
  //   } else {
  //     return null;
  //   }
  // }

  async getSucursalesByUsuario  (strLogin, token){
    const response = await axios.get(
      `${this.url}TravelAgencyBranches/TravelAgencyBranchesbyLogin?strLogin=${strLogin}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

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
  
      const userPermissions = response.data.map((permiso) => permiso.Alias);
      localStorage.setItem("UserPermissions", JSON.stringify(userPermissions));
  
      return userPermissions;
    } catch (error) {
      console.error("Error al obtener permisos:", error);
      return [];
    }
  }
  

}





export default new UsuarioService();
