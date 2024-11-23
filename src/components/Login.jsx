import useStore from "../store";

const Login = () => {
  const login = useStore((state) => state.login);

  const handleLogin = () => {
    login({ name: "Juan", account: "12345" });
    alert("Login exitoso");
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
