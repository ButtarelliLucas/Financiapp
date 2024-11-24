// src/components/RoleProtectedRoute.jsx
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const user = useStore((state) => state.user);
  const isLoggingOut = useStore((state) => state.isLoggingOut);
  const logout = useStore((state) => state.logout);
  const updateExpiry = useStore((state) => state.updateExpiry);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpired = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("RoleProtectedRoute - Estado del usuario:", user);
    console.log("RoleProtectedRoute - isLoggingOut:", isLoggingOut);

    if (isLoggingOut) {
      console.log("RoleProtectedRoute - Logout en progreso, no redirigir.");
      return;
    }

    if (!user || !user.token) {
      // Usuario no autenticado
      console.log("RoleProtectedRoute - Usuario no autenticado.");

      if (!sessionExpired.current) {
        console.log("RoleProtectedRoute - Redirigiendo a no autorizado.");
        navigate("/no-autorizado");
      }
      return;
    }

    // Verificar si el usuario tiene uno de los roles permitidos
    if (!allowedRoles.includes(user.role)) {
      console.log("RoleProtectedRoute - Usuario sin permiso para acceder.");
      navigate("/no-autorizado");
      return;
    }

    // Reiniciar la expiración de la sesión al navegar dentro de rutas protegidas
    updateExpiry();
    console.log("RoleProtectedRoute - Sesión actualizada.");

    const timeLeft = user.expiry - Date.now();
    console.log("RoleProtectedRoute - Tiempo restante de sesión:", timeLeft);

    if (timeLeft <= 0) {
      // Sesión expirada
      sessionExpired.current = true;
      console.log("RoleProtectedRoute - Sesión expirada por tiempo.");
      logout();
      navigate("/sesion-expirada");
    } else {
      // Limpiar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("RoleProtectedRoute - Timeout anterior limpiado.");
      }

      // Establecer nuevo timeout para manejar la expiración de la sesión
      timeoutRef.current = setTimeout(() => {
        sessionExpired.current = true;
        console.log("RoleProtectedRoute - Sesión expirada por timeout.");
        logout();
        navigate("/sesion-expirada");
      }, timeLeft);
    }

    // Limpiar timeout al desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("RoleProtectedRoute - Timeout limpiado al desmontar.");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoggingOut, logout, navigate, allowedRoles]);

  // **Efecto para actualizar la expiración al navegar dentro de rutas protegidas**
  useEffect(() => {
    if (user && user.token) {
      updateExpiry();
      console.log("RoleProtectedRoute - Expiración actualizada al navegar.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Renderizar los hijos si el usuario está autenticado, tiene el rol adecuado y la sesión es válida
  return user && user.token && allowedRoles.includes(user.role) && user.expiry > Date.now() ? children : null;
};

export default RoleProtectedRoute;
