import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import useStore from "./store";

function App() {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <div>
        {user ? (
          <p>Usuario logueado: {user.name}, Cuenta: {user.account}</p>
        ) : (
          <p>No hay usuario logueado.</p>
        )}
      </div>
      <Routes>
        <Route path="/" element={<div><h1>Bienvenido a la Financiera</h1> <Login /></div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
