import { useState, useEffect } from 'react';
import UsuarioService from '../services/UsuarioService';
import { decodeToken } from '../utils/tokenUtils';
import izitoast from 'izitoast';

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSucursales = async () => {
    const token = localStorage.getItem("Token");
    
    if (!token) {
      setError("No hay token disponible");
      setLoading(false);
      return;
    }

    const strLogin = decodeToken(token);
    
    if (!strLogin) {
      setError("Token inválido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await UsuarioService.getSucursalesByUsuario(strLogin, token);
      setSucursales(response.TravelAgencyBranches || []);
      setError(null);
    } catch (err) {
      console.error("Error al obtener las sucursales:", err);
      setError("Error al cargar sucursales");
      izitoast.error({
        title: 'Error',
        message: 'No se pudieron cargar las sucursales',
        position: 'bottomRight',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSucursales();
  }, []);

  return { 
    sucursales, 
    loading, 
    error, 
    loadSucursales,
    setSucursales // Por si necesitas actualizar externamente
  };
};