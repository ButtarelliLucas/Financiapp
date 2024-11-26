// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { apiLogin } from "../api/api";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const loginStore = useStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await apiLogin(account, password);
      loginStore(userData);
      navigate("/mi-cuenta");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div>
    <div className="flex justify-center items-center mb-6">
        <img src="/Smartans.png" alt="Smartans" className="w-1/2" />
      </div>

    <div className="max-w-md mx-auto mt-12 p-6 border border-gray-600 rounded-md bg-gray-800 text-white">
      
      

      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-300"
          >
            Cuenta:
          </label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </button>
      </form>
      <div className="mt-6 p-4 bg-gray-700 rounded-md text-sm">
        <p className="font-bold">Credenciales de Prueba:</p>
        <p>
          Cuenta: <code className="text-blue-400">test_user</code>, Contraseña:{" "}
          <code className="text-blue-400">password123!</code>
        </p>
        <p>
          Cuenta: <code className="text-blue-400">admin_user</code>, Contraseña:{" "}
          <code className="text-blue-400">adminpassword!</code>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
