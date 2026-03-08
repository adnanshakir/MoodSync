import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useNavigate } from "react-router";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const navigate = useNavigate();

  const handleLogin = async ({ username, password, email }) => {
    try {
      setLoading(true);
      const response = await userLogin({ username, password, email });
      localStorage.setItem("token", "true");
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, username, password }) => {
    try {
      setLoading(true);
      const response = await userRegister({ username, email, password });
      localStorage.setItem("token", "true");
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await userLogout();
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
    navigate("/");
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
