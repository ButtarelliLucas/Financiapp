// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import useStore from '../store';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement, 
  PieController
} from 'chart.js';
import SessionTimer from '../components/SessionTimer';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement, 
  PieController
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
  }, [userInfo.token]);

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
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          }
        }
      }
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
          {/* Lista de Inversiones en Tarjetas */}
          <div style={styles.investmentList}>
            {investments.map((inv) => (
              <div className= "bg-gray-900" key={inv.id} style={styles.card}>
                <h4>{inv.type}</h4>
                <p><strong>Monto:</strong> ${inv.amount.toLocaleString()}</p>
                <p><strong>Fecha:</strong> {inv.date}</p>
                <p><strong>Estado:</strong> {inv.status}</p>
              </div>
            ))}
          </div>

          {/* Gráfico de Torta */}
          <div style={styles.chartContainer}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          
          {/* Gráfico de Barras */}
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

// Estilos mejorados
const styles = {
  container: {
    padding: '20px',
    paddingBottom: '100px',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  error: {
    color: 'red',
  },
  chartContainer: {
    marginTop: '30px',
    width: '100%',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  investmentList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    flex: '1 1 calc(33.333% - 20px)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',

  },
  // Media queries para responsividad
  '@media (max-width: 992px)': {
    card: {
      flex: '1 1 calc(50% - 20px)',
    },
  },
  '@media (max-width: 600px)': {
    card: {
      flex: '1 1 100%',
    },
  },
};

export default Dashboard;
