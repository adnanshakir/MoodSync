import React from "react";
import "../styles/form.css";

const Login = () => {
  return (
    <div className="form-page-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" className="form-input" placeholder="Username" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
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
          New here? <span className="form-link">Create account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
