import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticatedUser");
  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else return children;
};

export default PublicRoute;
