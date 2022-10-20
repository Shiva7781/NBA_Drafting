import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";

const Players = () => {
  const [searchName, setSearchName] = useState("");
  const [selected, setSelected] = useState();

  const [playersData, setPlayersData] = useState([]);
  // console.log("PlayersData:", playersData);

  useEffect(() => {
    displayPlayes();
  }, []);

  const displayPlayes = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players`)
      .then((res) => {
        // console.log(res.data.data);
        setPlayersData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const searchPlayer = (e) => {
    let NameValue = e.target.value;

    // console.log("value:", NameValue);
    setSearchName(NameValue);

    setTimeout(() => {
      getPlayerByName();
    }, 1000);
  };

  const getPlayerByName = () => {
    // console.log("searchName", searchName);

    axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${searchName}`)
      .then((res) => {
        // console.log(res.data.data);
        setPlayersData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const teamDetails = (i) => {
    // console.log("teamDetails", i);

    setSelected(i);
  };

  return (
    <>
      <div className="PlayerNameInput">
        <label htmlFor="searchPlayerName">Enter Player Name</label>
        <input
          type="text"
          value={searchName}
          placeholder="Search here..."
          onChange={searchPlayer}
        />
      </div>

      <div className="Players">
        {playersData
          // .filter((val) => {
          //   return val.first_name
          //     .toLowerCase()
          //     .includes(searchName.toLowerCase());
          // })
          .map((e, i) => {
            return (
              <div key={i}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kobe_Bryant_2014.jpg/943px-Kobe_Bryant_2014.jpg"
                  alt=""
                ></img>
                <p>
                  Name: {e.first_name} {e.last_name}
                </p>
                <p>Position: {e.position}</p>
                <button onClick={() => teamDetails(i)}>TEAM DETAILS</button>

                <div
                  className={selected === i ? "DetailsDiv" : "NO_DetailsDiv"}
                >
                  <h2>Team Details</h2>
                  <p>Team: {e.team["full_name"]}</p>
                  <p>Abbr: {e.team["abbreviation"]}</p>
                  <p>Conference: {e.team["conference"]}</p>
                  <p>Division: {e.team["division"]}</p>
                  <p>City: {e.team["city"]}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Players;
