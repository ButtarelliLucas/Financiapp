// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import useStore from '../store';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const investments = useStore((state) => state.investments);
  const isLoadingInvestments = useStore((state) => state.isLoadingInvestments);
  const investmentsError = useStore((state) => state.investmentsError);
  const loadInvestments = useStore((state) => state.loadInvestments);

  useEffect(() => {
    if (user && user.token) {
      loadInvestments(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Preparar datos para el gráfico
  const data = {
    labels: investments.map(inv => inv.type),
    datasets: [
      {
        label: 'Monto de Inversion',
        data: investments.map(inv => inv.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inversiones por Tipo',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      <p>Bienvenido, {user.name}!</p>
      
      <h3>Tus Inversiones</h3>
      
      {isLoadingInvestments ? (
        <p>Cargando inversiones...</p>
      ) : investmentsError ? (
        <p style={styles.error}>Error: {investmentsError}</p>
      ) : investments.length > 0 ? (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.type}</td>
                  <td>${inv.amount.toLocaleString()}</td>
                  <td>{inv.date}</td>
                  <td>{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Agregar el gráfico */}
          <div style={styles.chartContainer}>
            <Bar data={data} options={options} />
          </div>
        </>
      ) : (
        <p>No tienes inversiones registradas.</p>
      )}
    </div>
  );
};

// Estilos básicos
const styles = {
  container: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  error: {
    color: 'red',
  },
  chartContainer: {
    marginTop: '30px',
  },
};

export default Dashboard;
