import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default Protected;
