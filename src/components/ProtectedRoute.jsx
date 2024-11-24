// src/components/ProtectedRoute.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  const isLoggingOut = useStore((state) => state.isLoggingOut);
  const logout = useStore((state) => state.logout);
  const updateExpiry = useStore((state) => state.updateExpiry);
  const navigate = useNavigate();
  const sessionExpired = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("ProtectedRoute - Estado del usuario:", user);
    console.log("ProtectedRoute - isLoggingOut:", isLoggingOut);

    if (isLoggingOut) {
      console.log("ProtectedRoute - Logout en progreso, no redirigir.");
      return;
    }

    if (!user || !user.token) {
      // Usuario no autenticado
      console.log("ProtectedRoute - Usuario no autenticado.");

      if (!sessionExpired.current) {
        console.log("ProtectedRoute - Redirigiendo a no autorizado.");
        navigate("/no-autorizado");
      }
      return;
    }

    // Reiniciar la expiración de la sesión al navegar dentro de rutas protegidas
    updateExpiry();
    console.log("ProtectedRoute - Sesión actualizada.");

    const timeLeft = user.expiry - Date.now();
    console.log("ProtectedRoute - Tiempo restante de sesión:", timeLeft);

    if (timeLeft <= 0) {
      // Sesión expirada
      sessionExpired.current = true;
      console.log("ProtectedRoute - Sesión expirada por tiempo.");
      logout();
      navigate("/sesion-expirada");
    } else {
      // Limpiar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("ProtectedRoute - Timeout anterior limpiado.");
      }

      // Establecer nuevo timeout para manejar la expiración de la sesión
      timeoutRef.current = setTimeout(() => {
        sessionExpired.current = true;
        console.log("ProtectedRoute - Sesión expirada por timeout.");
        logout();
        navigate("/sesion-expirada");
      }, timeLeft);
    }

    // Limpiar timeout al desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("ProtectedRoute - Timeout limpiado al desmontar.");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoggingOut, logout, navigate]);

  // Renderizar los hijos si el usuario está autenticado y la sesión es válida
  return user && user.token && user.expiry > Date.now() ? children : null;
};

export default ProtectedRoute;
