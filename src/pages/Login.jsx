// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { apiLogin } from '../api/api'; // Importa 'apiLogin' correctamente

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const loginStore = useStore((state) => state.login); // Evitar conflictos de nombres

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llama a la función de login del API simulada
      const userData = await apiLogin(account, password); // Usa 'apiLogin' correctamente
      // Llama a la acción de login del store para actualizar el estado global
      loginStore(userData);
      // Redirige al usuario al dashboard o página protegida
      navigate('/mi-cuenta');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="account">Cuenta:</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <div style={styles.credentials}>
        <p><strong>Credenciales de Prueba:</strong></p>
        <p>Cuenta: <code>test_user</code>, Contraseña: <code>password123!</code></p>
        <p>Cuenta: <code>admin_user</code>, Contraseña: <code>adminpassword!</code></p>
      </div>
    </div>
  );
};

// Estilos básicos
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#212121',
    color: '#fff', // Asegura que el texto sea visible sobre el fondo oscuro
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  credentials: {
    marginTop: '20px',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default Login;
