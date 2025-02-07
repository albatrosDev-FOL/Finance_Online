import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const permissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];

  if (!permissions.includes(requiredPermission)) {
    alert("Acceso denegado. No tienes permiso para ver esta página.");
    return <Navigate to="/Sucursales" />;
  }

  return children;
};

export default ProtectedRoute;
