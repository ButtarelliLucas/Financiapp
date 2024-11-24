// src/pages/Home.jsx
import { Link } from "react-router-dom";
import useStore from "../store";

const Home = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Bienvenido a nuestra financiera</h1>
      {user ? (
        <>
          <p>Hola, {user.name}! Accede a tu cuenta para ver tus detalles.</p>
          <Link to="/mi-cuenta">
            <button>Mi Cuenta</button>
          </Link>
        </>
      ) : (
        <>
          <p>Por favor, inicia sesión para acceder a tu cuenta.</p>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
