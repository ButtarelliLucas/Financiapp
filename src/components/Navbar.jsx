// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Primero, cerrar sesión
    navigate("/"); // Luego, redirigir al inicio
  };

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      {user ? (
        <>
          <Link to="/mi-cuenta">Mi Cuenta</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </nav>
  );
};

export default Navbar;
