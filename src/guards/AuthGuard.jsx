import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UsuarioService from "../services/authService";

export const AuthGuard = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para manejar el estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await UsuarioService.isAuthenticated();
      if (!authenticated) {
        navigate('/'); // Redirige al login si no está autenticado
      } else {
        setIsAuth(true);
      } 
      setIsLoading(false); // Finaliza la carga
    };

    checkAuth();
  }, [navigate]);

  // Si está cargando, muestra un mensaje o un spinner
  if (isLoading) {
    return <p>Cargando...</p>; // Puedes reemplazar esto con un componente de carga
  }

  // Si está autenticado, muestra el contenido protegido
  // Si no está autenticado, redirige al login usando <Navigate />
  return isAuth ? children : <Navigate to="/" />;
};