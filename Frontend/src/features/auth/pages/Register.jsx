import React from "react";
import "../styles/form.css";

const Register = () => {
  return (
    <div className="form-page-container">
      <div className="form-card">
        <h1 className="form-title">Create Account</h1>

        <form>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" className="form-input" placeholder="johndoe" />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
            />
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
            Get Started
          </button>
        </form>

        <div className="form-footer">
          Already have an account? <span className="form-link">Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
