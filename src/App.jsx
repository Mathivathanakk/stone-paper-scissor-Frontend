import React, { useState } from "react";
import Game from "./Pages/Game";
import GameData from "./Pages/GameData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rounds from "./Pages/Rounds";

const App = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const choices = ["stone", "paper", "scissors"];
  const [gameId, setGameId] = useState(null);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Game
              
                gameId={gameId}
                setGameId={setGameId}
              />
            }
          />
          <Route
            path="/data/:id"
            element={<GameData score={score} setScore={setScore} />}
          />
          <Route
            path="/rounds/:id"
            element={
              <Rounds
                score={score}
                setScore={setScore}
                choices={choices}
                
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
