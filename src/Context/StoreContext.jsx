import axios from "axios";
import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const choices = ["stone", "paper", "scissors"];
  const [gameId, setGameId] = useState(null);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [currentRound, setCurrentRound] = useState(1);
  const url = "https://stone-paper-scissor-backend-mathi.onrender.com";
//console.log(url)
  const contextvalue = {
    score,
    setScore,
    choices,
    gameId,
    setGameId,
    player1,
    setPlayer1,
    player2,
    setPlayer2,
    player1Choice,
    setPlayer1Choice,
    player2Choice,
    setPlayer2Choice,
    currentRound,
    setCurrentRound,
    url,
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
