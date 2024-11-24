// src/pages/Settings.jsx
import useStore from '../store';

const Settings = () => {
  const user = useStore((state) => state.user);

  return (
    <div style={styles.container}>
      <h2>Configuración de la Aplicación</h2>
      <p>Bienvenido, {user.name}. Aquí puedes gestionar la configuración de la aplicación.</p>
      {/* Agrega más contenido y funcionalidades según tus necesidades */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
};

export default Settings;
