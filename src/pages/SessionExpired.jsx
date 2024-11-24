// src/pages/SessionExpired.jsx
import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div>
      <h1>Sesión Expirada</h1>
      <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.</p>
      <Link to="/login">
        <button>Iniciar Sesión</button>
      </Link>
      <Link to="/">
        <button>Ir al Inicio</button>
      </Link>
    </div>
  );
};

export default SessionExpired;
