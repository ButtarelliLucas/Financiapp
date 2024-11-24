// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h2>Acceso No Autorizado</h2>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/">
        <button>Volver al Inicio</button>
      </Link>
    </div>
  );
};

export default Unauthorized;
