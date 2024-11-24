import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const LogoutHandler = () => {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Eliminar usuario del estado global
    navigate("/login"); // Redirigir al login
  }, [logout, navigate]);

  return null; // No renderiza nada
};

export default LogoutHandler;
