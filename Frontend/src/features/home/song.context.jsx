import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/igmjpeg/mood-sync/songs/Kufar_PagalWorld__G5ustA3d1.mp3",
    albumArtUrl:
      "https://ik.imagekit.io/igmjpeg/mood-sync/albumArt/Kufar_PagalWorld__NXuHuj9Cy.jpeg",
    title: "Kufar",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false)

  return (
    <SongContext.Provider value={{loading, setLoading, song, setSong}}>
        {children}
    </SongContext.Provider>
  )
};
