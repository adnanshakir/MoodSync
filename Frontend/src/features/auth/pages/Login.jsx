import React, { useState } from "react";
import "../styles/form.css";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await handleLogin({ username, password });
      navigate("/mood-sync");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

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
              type="text"
              required
              className="form-input"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              onInput={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Password"
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-button" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
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
