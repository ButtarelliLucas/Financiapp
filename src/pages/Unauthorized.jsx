import { Link } from "react-router-dom";
import useStore from "../store";

const Unauthorized = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Acceso No Autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      {user ? (
        <Link to="/mi-cuenta">
          <button>Ir a Mi Cuenta</button>
        </Link>
      ) : (
        <Link to="/">
          <button>Ir al Inicio</button>
        </Link>
      )}
    </div>
  );
};

export default Unauthorized;
