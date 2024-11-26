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
import TransactionTable from '../components/TransactionTable';

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

  // Cargar inversiones cuando el usuario está logueado
  useEffect(() => {
    if (session.isLoggedIn && userInfo.token) {
      loadInvestments(userInfo.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.token]);

  // Calcular el saldo total
  const totalBalance = investments.reduce((sum, inv) => sum + inv.amount, 0);

  // Configuración del gráfico de barras
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
    maintainAspectRatio: false,
    plugins: {

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

  // Configuración del gráfico de torta
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
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
    return (
      <div className="container w-full mx-auto px-4 py-8">
        <p className="text-center text-lg text-white">No estás autenticado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
  {/* Encabezado con Dashboard, Bienvenida y Saldo Total */}
  <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
    <div className="flex-1 text-white text-center md:text-left">
      <h2 className="text-3xl font-semibold mb-2">Balance</h2>
      <p className="text-lg">Bienvenido, <stroke className="font-semibold" >{userInfo.name}!</stroke></p> 
    </div>
    <div className="flex-1 w-full bg-green-500 text-white p-6 rounded-lg shadow-lg text-center mt-4 md:mt-0">
      <h3 className="text-2xl font-semibold">Saldo Total</h3>
      <p className="text-4xl font-bold mt-2">
        ${isLoadingInvestments ? '...' : totalBalance.toLocaleString()}
      </p>
    </div>
  </div>

  <SessionTimer />

  {/* Título de Inversiones */}
  <h3 className="text-2xl font-medium mt-8 mb-4 text-white">Tus Inversiones</h3>

  {isLoadingInvestments ? (
    <p className="text-center text-white">Cargando inversiones...</p>
  ) : investmentsError ? (
    <p className="text-red-500 text-center">Error: {investmentsError}</p>
  ) : investments.length > 0 ? (
    <>
      {/* Lista de Inversiones en Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {investments.map((inv) => (
          <div
            key={inv.id}
            className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700"
          >
            <h4 className="text-xl font-semibold mb-2 text-white">{inv.type}</h4>
            <p className="mb-1 text-gray-300">
              <strong>Monto:</strong> ${inv.amount.toLocaleString()}
            </p>
            <p className="mb-1 text-gray-300">
              <strong>Fecha:</strong> {inv.date}
            </p>
            <p className="mb-1 text-gray-300">
              <strong>Estado:</strong> {inv.status}
            </p>
          </div>
        ))}
      </div>
      <TransactionTable />
{/* Gráficos */}
<div className="mt-10 flex flex-col md:flex-row justify-between items-start gap-6">
  {/* Gráfico de Pastel */}
  <div className="bg-gray-800 w-full p-6 flex-1 rounded-md shadow-md overflow-hidden">
    <h4 className="text-xl font-semibold mb-4 text-center text-white">
      Distribución de Inversiones
    </h4>
    <div className="flex justify-center items-center h-full">
      <Pie className="w-full p-2 h-full max-w-full max-h-full" data={pieData} options={pieOptions} />
    </div>
  </div>
  {/* Gráfico de Barras */}
  <div className="bg-gray-800 w-full p-6 flex-1  rounded-md shadow-md overflow-hidden">
    <h4 className="text-xl font-semibold mb-4 text-center text-white">
      Inversiones por Tipo
    </h4>
    <div className="flex justify-center items-center h-full">
      <Bar className="w-full p-2 h-full max-w-full max-h-full" data={barData} options={barOptions} />
    </div>
  </div>
</div>


    </>
  ) : (
    <p className="text-center text-white">No tienes inversiones registradas.</p>
  )}
</div>

  );
};

export default Dashboard;
