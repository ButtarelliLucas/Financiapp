// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import useStore from '../store';
import { Bar, Pie } from 'react-chartjs-2'; // Importar Pie
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,      // Importar ArcElement para gráficos de torta
  PieController    // Importar PieController para gráficos de torta
} from 'chart.js';
import SessionTimer from '../components/SessionTimer';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,      // Registrar ArcElement
  PieController    // Registrar PieController
);

const Dashboard = () => {
  const userInfo = useStore((state) => state.userInfo);
  const session = useStore((state) => state.session);
  const investments = useStore((state) => state.investments);
  const isLoadingInvestments = useStore((state) => state.isLoadingInvestments);
  const investmentsError = useStore((state) => state.investmentsError);
  const loadInvestments = useStore((state) => state.loadInvestments);

  useEffect(() => {
    if (session.isLoggedIn && userInfo.token) {
      loadInvestments(userInfo.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.token]); // Dependencia solo del token

  // Preparar datos para el gráfico de barras
  const barData = {
    labels: investments.map(inv => inv.type),
    datasets: [
      {
        label: 'Monto de Inversión',
        data: investments.map(inv => inv.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barOptions = {
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

  // Agrupar inversiones por tipo para el gráfico de torta
  const groupedInvestments = investments.reduce((acc, inv) => {
    if (acc[inv.type]) {
      acc[inv.type] += inv.amount;
    } else {
      acc[inv.type] = inv.amount;
    }
    return acc;
  }, {});

  // Preparar datos para el gráfico de torta
  const pieData = {
    labels: Object.keys(groupedInvestments),
    datasets: [
      {
        label: 'Porción de Inversión',
        data: Object.values(groupedInvestments),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FFCD56',
          '#C9CBCF',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribución de Inversiones por Tipo',
      },
    },
  };

  if (!session.isLoggedIn) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      <p>Bienvenido, {userInfo.name}!</p>
      
      <SessionTimer /> {/* Añadir el contador de sesión */}
      
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
          
           {/* Agregar el gráfico de torta */}
           <div style={styles.chartContainer}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          
          {/* Agregar el gráfico de barras */}
          <div style={styles.chartContainer}>
            <Bar data={barData} options={barOptions} />
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
    position: 'relative',
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
