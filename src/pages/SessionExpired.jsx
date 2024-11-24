// src/pages/SessionExpired.jsx
import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div style={styles.container}>
      <h1>Sesión Expirada</h1>
      <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.</p>
      <div style={styles.buttonContainer}>
        <Link to="/login">
          <button style={styles.button}>Iniciar Sesión</button>
        </Link>
        <Link to="/">
          <button style={styles.button}>Ir al Inicio</button>
        </Link>
      </div>
    </div>
  );
};

// Estilos opcionales para mejorar la apariencia
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SessionExpired;
