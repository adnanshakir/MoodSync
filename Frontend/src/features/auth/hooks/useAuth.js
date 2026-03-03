import { useContext } from "react";
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
    setLoading(true);
    const response = await userLogin({ username, password, email });
    setUser(response.user);
    setLoading(false);
  };

  const handleRegister = async ({ email, username, password }) => {
    setLoading(true);
    const response = await userRegister({ username, email, password });
    setUser(response.user);
    setLoading(false);
  };

  const hanldeGetMe = async () => {
    setLoading(true);
    const response = await getMe();
    setUser(response.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const response = await userLogout();
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
