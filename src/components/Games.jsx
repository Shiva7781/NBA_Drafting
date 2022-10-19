import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";

const Games = () => {
  const [startDate, setStartDate] = useState("2010-01-10");
  const [endDate, setEndDate] = useState("2010-07-07");

  // const [seasonFilter, setSeasonFilter] = useState("");

  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    displayGames();

    // console.log(startDate, endDate);

    // eslint-disable-next-line
  }, [startDate, endDate]);

  const displayGames = () => {
    // console.log(startDate, endDate);

    axios
      .get(
        `https://www.balldontlie.io/api/v1/games?start_date=${startDate}&end_date=${endDate}&per_page=100`
      )
      .then((res) => {
        // console.log(res.data.data);
        setGamesData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSeasonFilter = (e) => {
    const value = e.target.value;
    console.log("handleSeasonFilter", value);
  };

  const handleDate = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    // console.log(value);

    let finalDD = value.slice(8);
    // console.log("finalDD:", finalDD);

    let finalMM = value.slice(5, 7);
    // console.log("finalMM:", finalMM);

    if (field == "startDate") {
      let endYYYY = value.split("").splice(0, 3);
      endYYYY.push(Number(value[3]) + 1);
      const finalEndYYYY = `${endYYYY.join("")}-${finalMM}-${finalDD}`;

      // console.log("finalEndYYYY:", finalEndYYYY);

      setStartDate(value);
      setEndDate(finalEndYYYY);
      //
    } else if (field == "endDate") {
      let startYYYY = value.split("").splice(0, 3);
      startYYYY.push(Number(value[3]) - 1);
      const finalStartYYYY = `${startYYYY.join("")}-${finalMM}-${finalDD}`;

      // console.log("finalStartYYYY:", finalStartYYYY);

      setStartDate(finalStartYYYY);
      setEndDate(value);
    }
  };

  return (
    <>
      <div className="AllInput">
        <div>
          <label htmlFor="startDate">Start Date</label>
          <br />
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDate}
          />
        </div>

        <div>
          <label htmlFor="">Seasons Filter</label>
          <br />
          <select
            name=""
            // value={seasonFilter}
            onChange={handleSeasonFilter}
          >
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
          </select>
        </div>

        <div>
          <label htmlFor="endDate">Last Date</label>
          <br />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDate}
          />
        </div>
      </div>

      {gamesData

        // .filter((val) => {
        //   // console.log("current season:", val.season);

        //   return val.season.toString().includes(seasonFilter.toString());
        //   // return val.season.toString().includes(seasonFilter.toString());
        // })

        .map((ele, i) => {
          let DateFormated = new Date(ele.date);
          // console.log("DateFormated:", DateFormated);

          let displayDate = `${DateFormated.getDay()}-${DateFormated.getMonth()}-${DateFormated.getFullYear()}`;
          // console.log("displayDate:", displayDate);

          return (
            <div className="Games" key={i}>
              <div className="Left">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89WO_fHZw0T-t0u34FnvUtmuVYTvDkaY9ROJEDwe2Dw&s"
                  alt="bl"
                />
                <span className="Result">
                  <h3>{ele.home_team.full_name} </h3>
                  <h3
                    className={
                      ele.home_team_score > ele.visitor_team_score
                        ? "WON"
                        : ele.home_team_score < ele.visitor_team_score
                        ? "LOST"
                        : "TIE"
                    }
                  >
                    {ele.home_team_score > ele.visitor_team_score
                      ? "WON"
                      : ele.home_team_score < ele.visitor_team_score
                      ? "LOST"
                      : "TIE"}
                  </h3>
                </span>
                <p>Date: {displayDate}</p>
                <p>Season: {ele.season}</p>
                <p>Status: {ele.status}</p>
                <p>Home Team Score: {ele.home_team_score}</p>
                <p>Division: {ele.home_team.division}</p>
              </div>

              <h2>VS</h2>

              <div className="Right">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89WO_fHZw0T-t0u34FnvUtmuVYTvDkaY9ROJEDwe2Dw&s"
                  alt="bl"
                />
                <span className="Result">
                  <h3 className="Result">{ele.visitor_team.full_name} </h3>
                  <h3
                    className={
                      ele.home_team_score < ele.visitor_team_score
                        ? "WON"
                        : ele.home_team_score > ele.visitor_team_score
                        ? "LOST"
                        : "TIE"
                    }
                  >
                    {ele.home_team_score < ele.visitor_team_score
                      ? "WON"
                      : ele.home_team_score > ele.visitor_team_score
                      ? "LOST"
                      : "TIE"}
                  </h3>
                </span>
                <p>Date: {displayDate}</p>
                <p>Season: {ele.season}</p>
                <p>Status: {ele.status}</p>
                <p>Visitor Team Score: {ele.visitor_team_score}</p>
                <p>Division: {ele.visitor_team.division}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Games;
