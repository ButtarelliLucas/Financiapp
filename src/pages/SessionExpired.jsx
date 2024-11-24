// src/pages/SessionExpired.jsx
import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div>
      <h2>Sesión Expirada</h2>
      <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
      <Link to="/login">
        <button>Iniciar Sesión</button>
      </Link>
    </div>
  );
};

export default SessionExpired;
