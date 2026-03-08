import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
  getMe,
  userLogin,
  userLogout,
  userRegister,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ username, password, email }) => {
    try {
      setLoading(true);
      const response = await userLogin({ username, password, email });
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, username, password }) => {
    try {
      setLoading(true);
      const response = await userRegister({ username, email, password });
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

const handleGetMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const response = await getMe();
    setUser(response.user);
  } catch (err) {
    if (err.response?.status === 401) {
      setUser(null);
    } else {
      console.error(err);
    }
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    setLoading(true);
    const response = await userLogout();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};
