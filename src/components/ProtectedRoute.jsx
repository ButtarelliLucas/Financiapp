// src/components/ProtectedRoute.jsx
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const updateExpiry = useStore((state) => state.updateExpiry);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpired = useRef(false);
  const timeoutRef = useRef(null);
  const prevPathnameRef = useRef(location.pathname);

  // **Efecto para manejar la expiración de la sesión**
  useEffect(() => {
    console.log("Estado del usuario:", user);

    if (sessionExpired.current) {
      // Ya manejamos la redirección por sesión expirada
      return;
    }

    if (!user || !user.token) {
      // Usuario no autenticado
      if (!sessionExpired.current) {
        console.log("Redirigiendo a no autorizado");
        navigate("/no-autorizado");
      }
      return;
    }

    const timeLeft = user.expiry - Date.now();
    console.log("Tiempo restante de sesión:", timeLeft);

    if (timeLeft <= 0) {
      // Sesión expirada
      sessionExpired.current = true;
      console.log("Sesión expirada");
      logout();
      navigate("/sesion-expirada");
    } else {
      // Limpiar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Establecer nuevo timeout para manejar la expiración
      timeoutRef.current = setTimeout(() => {
        sessionExpired.current = true;
        console.log("Sesión expirada por timeout");
        logout();
        navigate("/sesion-expirada");
      }, timeLeft);
    }

    // Limpiar timeout al desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, logout, navigate]);

  // **Efecto para actualizar la expiración al navegar dentro de rutas protegidas**
  useEffect(() => {
    if (user && user.token) {
      if (prevPathnameRef.current !== location.pathname) {
        // La ruta ha cambiado, actualizamos la expiración
        updateExpiry();
        prevPathnameRef.current = location.pathname;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Renderizar los hijos si el usuario está autenticado y la sesión es válida
  return user && user.token && user.expiry > Date.now() ? children : null;
};

export default ProtectedRoute;
