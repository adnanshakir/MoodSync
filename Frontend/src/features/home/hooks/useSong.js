import { useContext } from "react";
import { getSong, uploadSong } from "../services/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading, playlist, setPlaylist } = context;

  async function fetchSong(moodObj) {
    setLoading(true);
    try {
      const response = await getSong(moodObj.mood);

      if (response.songs && response.songs.length > 0) {
        setPlaylist(response.songs);
        setSong(response.songs[0]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadSong(formData) {
    setLoading(true);

    try {
      const response = await uploadSong(formData);
      setPlaylist((prev) => [...prev, response.song]);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, song, playlist, fetchSong, setSong, handleUploadSong };
};
