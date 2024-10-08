import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Rounds = ({ score, setScore, choices }) => {
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [currentRound, setCurrentRound] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const handleGame = async (e) => {
    e.preventDefault();
    let winner = "";
    if (player1Choice === player2Choice) {
      winner = "tie";
    } else if (
      (player1Choice === "stone" && player2Choice === "scissors") ||
      (player1Choice === "scissors" && player2Choice === "paper") ||
      (player1Choice === "paper" && player2Choice === "stone")
    ) {
      winner = "player1";
      setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else {
      winner = "player2";
      setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
    }
    setCurrentRound(currentRound + 1);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/games/record",
        {
          roundData: {
            player1_choice: player1Choice,
            player2_choice: player2Choice,
            winner: winner,
            game_id: params.id,
          },
        }
      );
      setPlayer1Choice("");
      setPlayer2Choice("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-content-center flex-wrap flex-column">
      {currentRound <= 6 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap flex-column mt-5 register">
          <form action="" onSubmit={handleGame}>
            <div>
              <h2 className="text-center fs-3 mt-4 title">ROUNDS</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 text-center">
              <div className="p-2">
                <select
                  onChange={(e) => setPlayer1Choice(e.target.value)}
                  className="p-4 rounded-4"
                  required
                >
                  <option value="" required>
                    Select Player 1 Choice
                  </option>
                  {choices.map((e) => (
                    <option key={e} value={e} required>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-2">
                <select
                  onChange={(e) => setPlayer2Choice(e.target.value)}
                  className="p-4 rounded-4"
                  required
                >
                  <option value="" required>
                    Select Player 2 Choice
                  </option>
                  {choices.map((e) => (
                    <option key={e} value={e} required>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center p-2">
              <button className="btn px-5">GO</button>
            </div>
          </form>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center flex-wrap flex-column mt-5 register gap-2">
        <h2 className="fs-5 font-bold rounded title ">SCORE</h2>
        <h5 className="fs-4 gap-2">
          Player 1:&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="fs-3">{score.player1}</span>
        </h5>
        <h5 className="fs-4 gap-2">
          Player 2:&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="fs-3">{score.player2}</span>
        </h5>
        {currentRound > 6 && <h1 className="title">Game Over!</h1>}
        <button className="btn" onClick={() => navigate(`/data/${params.id}`)}>
          Games Data
        </button>
      </div>
    </div>
  );
};

export default Rounds;
