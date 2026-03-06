import { useContext } from "react";
import { getSong } from "../services/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;

  async function fetchSong(mood) {
    setLoading(true);
    const response = await getSong(mood);
    setSong(response.song);
    setLoading(false);
  }

  return {
    loading,
    song,
    fetchSong,
  };
};
