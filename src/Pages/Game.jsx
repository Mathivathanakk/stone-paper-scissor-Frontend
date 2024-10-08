import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const Game = ({ setGameId }) => {
  const [player1, setPlayer1] = useState("");

  const [player2, setPlayer2] = useState("");

  // const [gameId, setGameId] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/games/createGame",
        { player1, player2 }
      );
      setGameId(response.data.id);
  
      navigate(`/rounds/${response.data.id}`);
      setPlayer1("");
      setPlayer2("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-content-center flex-wrap flex-column">
      <h1 className="text-center fs-3 mt-4 title ">STONE PAPER SCISSORS</h1>

      <div className="d-flex justify-content-center align-items-center flex-wrap flex-column mt-5 register">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="p-2">
            <h3 className="fs-5 font-bold rounded title">Player 1</h3>
            <input
              type="text"
              name="player1"
              placeholder="Enter the Player 1 Name"
              className=""
              required
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </div>
          <div className="p-2">
            <h3 className="fs-5 font-bold   rounded title ">Player 2</h3>
            <input
              type="text"
              placeholder="Enter the Player 2 Name"
              name="player2"
              required
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center p-2">
            <button className="btn m-1">Start Game</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Game;
