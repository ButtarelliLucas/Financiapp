// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import useStore from '../store';
import Spinner from './Spinner'; // Ruta relativa correcta

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useStore((state) => state.session.isLoggedIn);
  const userInfo = useStore((state) => state.userInfo);
  const loading = useStore((state) => state.loading); // Obtener el estado de carga

  console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);
  console.log("ProtectedRoute - userInfo:", userInfo);
  console.log("ProtectedRoute - loading:", loading);

  if (loading) {
    // Mientras se inicializa la sesión, mostrar el Spinner
    return <Spinner />;
  }

  if (!isLoggedIn || !userInfo) {
    console.log("ProtectedRoute - Usuario no autenticado.");
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
};

export default ProtectedRoute;
