import React from "react";
import { useNavigate } from "react-router";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/home.css";

const Home = () => {
  const { fetchSong, playlist, setSong, song, loading, handleUploadSong } =
    useSong();
  const { handleLogout } = useAuth();


  const getTooltipText = () => {
    if (!playlist.length)
      return "Please detect your emotion first to enable uploads.";
    return "Max file size: 10MB";
  };

  const handleUploadClick = (e) => {
    if (!playlist.length) {
      alert(
        "Please click the 'Detect' button to find your mood before uploading!",
      );
      e.preventDefault();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large! Please upload a song 10MB or less.");
      e.target.value = null;
      return;
    }

    const currentMood = song?.mood || "Unknown";

    const formData = new FormData();
    formData.append("song", file);
    formData.append("mood", currentMood);

    handleUploadSong(formData);

    e.target.value = null;
  };

  const handleLogoutUser = async () => {
    await handleLogout();
  };

  return (
    <div className="app-grid">
      <nav className="home-nav">
        <h1 className="mobile-title">MoodSync AI</h1>
        <button className="btn-primary" onClick={handleLogoutUser}>Logout</button>
      </nav>
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
        <div
          className="upload-wrapper"
          title={getTooltipText()}
          onClick={handleUploadClick}
        >
          <label
            className={`upload-dashed-btn ${!playlist.length ? "disabled" : ""}`}
          >
            <input
              type="file"
              hidden
              accept="audio/*"
              disabled={!playlist.length}
              onChange={handleFileUpload}
            />
            <span>+ Upload a song</span>
          </label>
        </div>
      </aside>
    </div>
  );
};

export default Home;
