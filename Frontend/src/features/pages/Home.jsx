import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <nav className="navbar">
          <div className="nav-logo">MoodSync</div>
          <div className="nav-links">
            <Link to="/login" className="nav-link-text">
              Login
            </Link>
            <Link to="/register" className="nav-btn-sm">
              Get Started
            </Link>
          </div>
        </nav>

        <main className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              A mood tracker you'll{" "}
              <span className="text-accent">actually</span> use
            </h1>
            <p className="hero-description">
              A simple and beautiful expression analysis app designed to help
              you understand your emotional rhythm.
            </p>
            <div className="hero-actions">
              <Link to="/mood-sync" className="btn-primary">
                Try Demo
              </Link>
              <span className="hero-note">No login required</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="music-card-simple">
              <img
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop"
                alt="MoodSync Visual"
                className="card-image"
              />
              <div className="card-song-info">
                <span className="card-song-title">Emerald Waves</span>
                <span className="card-artist-name">MoodSync AI • Calming</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
