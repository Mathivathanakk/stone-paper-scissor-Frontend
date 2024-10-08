import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const GameData = ({ score, setScore }) => {
  const [data, setData] = useState([]);
  const params = useParams();
  //console.log(params)
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://stone-paper-scissor-backend-mathi.onrender.com/api/games/history/${params.id}`
      );
      setData(response.data);
      setScore({ player1: 0, player2: 0 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center flex-wrap flex-column  ">
      <div className="d-flex justify-content-center align-items-center flex-wrap flex-column mt-5 register p-2">
        <div
          className="text-center  font-semibold "
          style={{ color: "rgb(50, 34, 65)" }}
        >
          <h1 className="title">GAME DATA</h1>
        </div>

        {data.map((ele, index) => (
          <div key={index} className="d-flex gap-5">
            <div className="row">
            <p className="col">{index + 1}.</p>
            <p className="col">{ele.player1_choice}</p>
            <p className="col">VS</p>
            <p className="col">{ele.player2_choice}</p>
            <p className="col">-</p>
            <p className="col">{ele.winner}</p>
            </div>
           
          </div>
        ))}
        <div>
          <button className="btn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameData;
