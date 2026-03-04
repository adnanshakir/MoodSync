import React from "react";
import { Navigate, useNavigation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigation();

  if (!loading || !user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default Protected;
