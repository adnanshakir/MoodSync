import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const [loading, setLoading] = useState(false)

  return (
    <SongContext.Provider value={{loading, setLoading, song, setSong, playlist, setPlaylist}}>
        {children}
    </SongContext.Provider>
  )
};
