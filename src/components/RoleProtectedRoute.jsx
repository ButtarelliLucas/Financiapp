// src/components/RoleProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import useStore from '../store';
import Spinner from './Spinner'; // Asegúrate de que la ruta es correcta

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const isLoggedIn = useStore((state) => state.session.isLoggedIn);
  const userInfo = useStore((state) => state.userInfo);
  const loading = useStore((state) => state.loading); // Obtener el estado de carga

  console.log("RoleProtectedRoute - isLoggedIn:", isLoggedIn);
  console.log("RoleProtectedRoute - userInfo:", userInfo);
  console.log("RoleProtectedRoute - allowedRoles:", allowedRoles);
  console.log("RoleProtectedRoute - loading:", loading);

  if (loading) {
    // Mientras se inicializa la sesión, mostrar el Spinner
    return <Spinner />;
  }

  if (!isLoggedIn || !userInfo) {
    console.log("RoleProtectedRoute - Usuario no autenticado.");
    return <Navigate to="/no-autorizado" replace />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    console.log(`RoleProtectedRoute - Rol '${userInfo.role}' no autorizado.`);
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
