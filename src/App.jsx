// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SessionExpired from "./pages/SessionExpired";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/Navbar";
import useStore from "./store";
import TestComponent from "./components/TestComponent";
import "./App.css";

import "./index.css";
function App() {
  const initializeSession = useStore((state) => state.initializeSession);
  const updateExpiry = useStore((state) => state.updateExpiry);

  useEffect(() => {
    initializeSession();

    // Definir eventos que indican actividad del usuario
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const resetTimer = () => {
      updateExpiry();
    };

    // Agregar listeners para cada evento
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Limpiar listeners al desmontar
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Asegurarse de que el arreglo de dependencias está vacío

  return (
    <Router>
      <Navbar />
      <div className="main-content w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta protegida para usuarios estándar */}
          <Route
            path="/mi-cuenta"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Ruta protegida para administradores */}
          <Route
            path="/configuracion"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </RoleProtectedRoute>
            }
          />
          
          <Route path="/sesion-expirada" element={<SessionExpired />} />
          <Route path="/no-autorizado" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
