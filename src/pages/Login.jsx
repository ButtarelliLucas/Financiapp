import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  // Función para generar un token ficticio de 256 caracteres
  const generateToken = (length = 256) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  // Manejo del formulario de login
  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales simuladas
    if (username === "test_user" && password === "SecurePass123!") {
      const token = generateToken(); // Generar token
      login({ name: username, account: "12345", token }); // Guardar en Zustand
      navigate("/mi-cuenta"); // Redirigir al dashboard
    } else {
      setError("Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
