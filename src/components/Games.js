import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";

const Games = () => {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  console.log("firstDate:", firstDate);
  console.log("lastDate:", lastDate);

  const [gamesData, setGamesData] = useState([]);
  // console.log("gamesData:", gamesData);

  useEffect(() => {
    displayGames();

    // eslint-disable-next-line
  }, []);

  const displayGames = () => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?start-date=${firstDate}&end-date=${lastDate}`
      )
      .then((res) => {
        // console.log(res.data.data);
        setGamesData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="AllInput">
        <label htmlFor="firstDate">FirstDate</label>
        <input
          type="date"
          name="firstDate"
          className="LeftInput"
          onChange={(e) => setFirstDate(e.target.value)}
        />

        <div>
          <label htmlFor="lastDate">LastDate</label>
          <input
            type="date"
            name="lastDate"
            className="RightInput"
            onChange={(e) => setLastDate(e.target.value)}
          />
        </div>
      </div>

      <div className="Games">
        <div className="Left">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89WO_fHZw0T-t0u34FnvUtmuVYTvDkaY9ROJEDwe2Dw&s"
            alt="bl"
          />
          <h3>Team Name</h3>
          <p>Date</p>
          <p>Season</p>
          <p>Status</p>
          <p>Home Team Score</p>
          <p>Division</p>
        </div>

        <h2>VS</h2>

        <div className="Right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89WO_fHZw0T-t0u34FnvUtmuVYTvDkaY9ROJEDwe2Dw&s"
            alt="bl"
          />
          <h3>Team Name</h3>
          <p>Date</p>
          <p>Season</p>
          <p>Status</p>
          <p>Home Team Score</p>
          <p>Division</p>
        </div>
      </div>
    </>
  );
};

export default Games;
