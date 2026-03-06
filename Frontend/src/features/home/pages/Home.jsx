import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { fetchSong } = useSong();
  return (
    <>
      <FaceExpression onClick={(expression) => fetchSong(expression)} />
      <Player />
    </>
  );
};

export default Home;
