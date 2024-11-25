// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { BarChart, PieChart, TrendingUp } from "lucide-react";
import  useStore  from "../store";

const Home = () => {
  const userInfo = useStore((state) => state.userInfo);
  const isLoggedIn = useStore((state) => state.session.isLoggedIn);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a Financiapp
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Gestiona tus inversiones y toma el control de tu futuro financiero.
          </p>
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg">
                Comenzar Ahora
              </button>
            </Link>
          ) : (
            <Link to="/mi-cuenta">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg">
                Ir a Mi Cuenta
              </button>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 md:mb-16">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <BarChart className="w-12 h-12 mb-4 text-primary mx-auto" />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Seguimiento de Portafolio
            </h2>
            <p>
              Monitorea tus inversiones en tiempo real con nuestras herramientas
              avanzadas.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <PieChart className="w-12 h-12 mb-4 text-primary mx-auto" />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Distribución de Activos
            </h2>
            <p>
              Visualiza y optimiza tu asignación de activos para un mejor
              rendimiento.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <TrendingUp className="w-12 h-12 mb-4 text-primary mx-auto" />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Análisis de Rendimiento
            </h2>
            <p>
              Obtén información detallada sobre el rendimiento de tus
              inversiones.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            ¿Listo para gestionar tus inversiones como un experto?
          </h2>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg">
              Registrarse Ahora
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
