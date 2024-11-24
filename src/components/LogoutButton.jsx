import { useNavigate } from "react-router-dom";

const LogoutButton = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        logout(); // Llama a la función de logout
        navigate("/"); // Redirige a la página de inicio
      }}
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
