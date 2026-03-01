import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { userLogin } from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  //   here i cant deconstruct user

  const handleLogin = async (username, password) => {
    setLoading(true);

    const response = await userLogin(username, password);

    setUser(response.user);

    setLoading(false);
  };

  return {
    user,
    loading,
    handleLogin,
  };
};
