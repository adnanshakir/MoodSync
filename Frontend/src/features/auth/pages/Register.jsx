import React, { useState } from "react";
import "../styles/form.css";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { user, loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try{
      await handleRegister({username, password, email});
      navigate("/mood-sync")
    }catch(err){
      console.error("Bad Request try again")
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <h1 className="form-title">Create Account</h1>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              onInput={(e) => setUsername(e.target.value)}
              className="form-input"
              required
              placeholder="johndoe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              name="email"
              onInput={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              name="password"
              onInput={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="form-button">
            Get Started
          </button>
        </form>

        <div className="form-footer">
          Already have an account?{" "}
          <Link to="/login" className="form-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
