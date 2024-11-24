// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SessionExpired from "./pages/SessionExpired";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/mi-cuenta"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
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
