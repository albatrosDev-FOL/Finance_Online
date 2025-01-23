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
}

export default new UsuarioService();
