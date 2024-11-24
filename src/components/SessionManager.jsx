// src/components/SessionManager.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../store";

const SESSION_DURATION = 10000; // 10 segundos para pruebas

const SessionManager = ({ children }) => {
  const user = useStore((state) => state.user);
  const updateExpiry = useStore((state) => state.updateExpiry);
  const logout = useStore((state) => state.logout);
  const location = useLocation();

  useEffect(() => {
    if (user && user.token) {
      // Reiniciar expiración de sesión al navegar
      updateExpiry();

      const timeLeft = user.expiry - Date.now();
      console.log("Tiempo restante de sesión:", timeLeft);

      if (timeLeft <= 0) {
        console.log("Sesión expirada");
        logout();
        window.location.href = "/sesion-expirada"; // Redirigir a sesión expirada
      } else {
        const timeout = setTimeout(() => {
          console.log("Sesión expirada por timeout");
          logout();
          window.location.href = "/sesion-expirada";
        }, SESSION_DURATION);

        return () => clearTimeout(timeout);
      }
    }
  }, [user, logout, updateExpiry, location.pathname]);

  return children;
};

export default SessionManager;
