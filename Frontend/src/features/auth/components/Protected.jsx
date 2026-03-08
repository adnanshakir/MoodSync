import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import "../styles/protected.css";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-loader">
        <div className="loader-spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
