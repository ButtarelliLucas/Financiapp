import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Iconos para el menú
import  useStore  from "../store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para el sidebar
  const userInfo = useStore((state) => state.userInfo);
  const isLoggedIn = useStore((state) => state.session.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate(); // Inicializar navigate

  const handleLogout = async () => {
    console.log("Navbar - Cerrar sesión");
    await logout();
    navigate("/", { replace: true }); // Redirigir al inicio con reemplazo en el historial
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Mi Cuenta", path: "/mi-cuenta", protected: true },
    { name: "Configuración", path: "/configuracion", adminOnly: true },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className=" flex items-center">
        <img src="/Smartans final blanco.png" alt="Smartans Logo" className="h-12 w-auto" />

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map(
            (link) =>
              (!link.protected || isLoggedIn) &&
              (!link.adminOnly || (userInfo?.role === "admin")) && (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-blue-400 transition"
                >
                  {link.name}
                </Link>
              )
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white fixed inset-0 z-40">
          <div className="p-6">
            <button
              className="text-white mb-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col space-y-4">
              {navLinks.map(
                (link) =>
                  (!link.protected || isLoggedIn) &&
                  (!link.adminOnly || (userInfo?.role === "admin")) && (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="hover:text-blue-400 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
              )}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
