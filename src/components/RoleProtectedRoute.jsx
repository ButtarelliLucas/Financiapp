import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      navigate("/no-autorizado");
    }
  }, [user, allowedRoles, navigate]);

  return user && allowedRoles.includes(user.role) ? children : null;
};

export default RoleProtectedRoute;
