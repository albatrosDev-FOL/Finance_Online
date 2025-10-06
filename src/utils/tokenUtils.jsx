export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    const identity = JSON.parse(parsedPayload.Identity);
    return identity.UserName;
  } catch (err) {
    console.error("Error al decodificar el token:", err);
    return null;
  }
};

// Función adicional para validar si el token es válido
export const isTokenValid = (token) => {
  try {
    if (!token) return false;
    
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    
    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000;
    return parsedPayload.exp > currentTime;
  } catch {
    return false;
  }
};