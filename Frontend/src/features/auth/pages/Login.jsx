import React, { useState } from "react";
import "../styles/form.css";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(username, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="form-page-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              onInput={(e) => setUsername(e.target.value)}
              name="username"
              type="username"
              className="form-input"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              onInput={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>
        <div className="form-footer">
          New here?{" "}
          <Link to="/register" className="form-link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
