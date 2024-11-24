import useStore from "../store";

const Dashboard = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Bienvenido, {user?.name}!</h1>
      <p>Cuenta: {user?.account}</p>
      <p>Saldo disponible: $10,000 (simulado)</p>
    </div>
  );
};

export default Dashboard;
