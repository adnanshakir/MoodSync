import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import "../styles/home.css";

const Home = () => {
  const { fetchSong, playlist, setSong, song, loading } = useSong();
  console.log("Current Playlist:", playlist);

  return (
    <div className="app-grid">
      {/* Left Column */}
      <aside className="intro-sidebar">
        <h1 className="hero-title">
          Your Emotional <span className="text-accent">Sync.</span>
        </h1>
        <p className="hero-subtitle">
          Experience music like never before. Detect your emotions and find the
          perfect soundtrack.
        </p>
      </aside>
      <main className="center-stage">
        <div className="camera-container">
          <FaceExpression
            onClick={(expression) => fetchSong({ mood: expression })}
          />
        </div>
        <Player />
      </main>
      {/* Right Column: Playlist */}
      <aside className="playlist-panel">
        <h3 className="panel-title">
          {song?.mood ? `${song.mood} Playlist` : "Mood Playlist"}
        </h3>
        <div className="song-scroll-area">
          {loading ? (
            <p className="status-text">Finding tracks...</p>
          ) : playlist.length > 0 ? (
            playlist.map((item) => (
              <div
                key={item._id}
                className={`playlist-card ${song?._id === item._id ? "active" : ""}`}
                onClick={() => setSong(item)}
              >
                <img src={item.albumArtUrl} alt="" className="mini-art" />
                <div className="mini-details">
                  <p className="mini-title">{item.title}</p>
                  <p className="mini-artist">
                    {item.artist || "Unknown Artist"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="status-text">Scan your face to see songs</p>
          )}
        </div>
        <button className="upload-dashed-btn">
          <span>+</span> Upload a song
        </button>
      </aside>
    </div>
  );
};

export default Home;
