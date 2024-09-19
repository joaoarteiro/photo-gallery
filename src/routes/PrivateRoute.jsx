import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = localStorage.getItem("authenticatedUser");
  if (user || isAuthenticated) {
    return children;
  } else return <Navigate to="/login" />;
};

export default PrivateRoute;
