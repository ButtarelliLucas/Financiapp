// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";
import SessionTimer from './SessionTimer'; // Asegúrate de importar SessionTimer

const Navbar = () => {
  const userInfo = useStore((state) => state.userInfo);
  const isLoggedIn = useStore((state) => state.session.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Navbar - Cerrar sesión");
    await logout(); // Esperar a que el logout termine
    navigate("/", { replace: true }); // Redirigir al inicio con reemplazo en el historial
  };

  return (
    <nav className="navbar">
      <div className="links-container">
        <Link to="/" className="link">Inicio</Link>
        {isLoggedIn && userInfo ? (
          <>
            <Link to="/mi-cuenta" className="link">Mi Cuenta</Link>
            
            {/* Mostrar enlace a configuración solo para administradores */}
            {userInfo.role === 'admin' && (
              <Link to="/configuracion" className="link">Configuración</Link>
            )}
            
            <button onClick={handleLogout} className="button">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="link">Iniciar Sesión</Link>
        )}
      </div>
      
      {/* Opcional: Añadir SessionTimer en el Navbar */}
      {isLoggedIn && userInfo && (
        <div className="session-timer">
          <SessionTimer />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
