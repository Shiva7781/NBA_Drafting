import React, { useEffect, useState } from "react";
import "./Games.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./PaginationComp.css";

const Games = () => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState([]);

  const [startDate, setStartDate] = useState("2010-01-10");
  const [endDate, setEndDate] = useState("2011-04-02");

  const [seasonState, setSeasonState] = useState("");

  useEffect(() => {
    // console.log(startDate, endDate);

    displayGames();
    // eslint-disable-next-line
  }, [startDate, endDate]);

  const displayGames = async () => {
    // console.log(startDate, endDate);

    axios
      .get(
        `https://www.balldontlie.io/api/v1/games?start_date=${startDate}&end_date=${endDate}&per_page=100`
      )
      .then((res) => {
        // console.log(res.data.data);
        setGamesData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDate = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    // console.log("field", "value:", field, value);

    if (field === "startDate") {
      let finalDDend = endDate.slice(8);

      let finalMMend = endDate.slice(5, 7);

      let endYYYY = value.split("").splice(0, 2);
      let ans1 = value[2] + value[3];

      endYYYY.push(Number(ans1) + 1);
      // console.log("endYYYY:", endYYYY);

      const D_EndYYY = `${endYYYY.join("")}-${finalMMend}-${finalDDend}`;
      // console.log("D_EndYYY:", D_EndYYY);

      setStartDate(value);
      setEndDate(D_EndYYY);

      //
    } else if (field === "endDate") {
      let finalDDstart = startDate.slice(8);

      let finalMMstart = startDate.slice(5, 7);

      let startYYYY = value.split("").splice(0, 2);
      let ans2 = value[2] + value[3];

      startYYYY.push(Number(ans2) - 1);
      // console.log("startYYYY:", startYYYY);

      const D_StrYYY = `${startYYYY.join("")}-${finalMMstart}-${finalDDstart}`;
      // console.log("D_StrYYY:", D_StrYYY);

      setStartDate(D_StrYYY);
      setEndDate(value);
    }
  };

  const handleSeasonFilter = (e) => {
    const value = e.target.value;
    // console.log("handleSeasonFilter", value);

    setLoading(true);
    setSeasonState(value);

    let arrYYYY = value.split("");
    let lastYY = arrYYYY[2] + arrYYYY[3];
    // console.log("lastYY:", lastYY);

    let newStartDate = `${value.slice(0, 2)}${+lastYY + 1}-01-01`;
    // console.log("newStartDate:", newStartDate);

    let newEndDate = `${value.slice(0, 2)}${+lastYY + 1}-12-31`;
    // console.log("newEndDate:", newEndDate);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  /** Pagination Part */

  const PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: selectedPage }) => {
    // console.log("selectedPage:", selectedPage);
    setCurrentPage(selectedPage);
  };

  // 0, 10, 20, 30...
  const offset = currentPage * PER_PAGE;
  // console.log("offset:", offset);

  const currentPageData = gamesData
    .slice(offset, offset + PER_PAGE)
    .map((ele, i) => {
      let Z = ele.date;
      // console.log("Z:", Z);

      let D_Date = `${Z.slice(0, 4)}-${Z.slice(5, 7)}-${Z.slice(8, 10)}`;
      // console.log("D_Date:", D_Date);

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
            <p>Date: {D_Date}</p>
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
            <p>Date: {D_Date}</p>
            <p>Season: {ele.season}</p>
            <p>Status: {ele.status}</p>
            <p>Visitor Team Score: {ele.visitor_team_score}</p>
            <p>Division: {ele.visitor_team.division}</p>
          </div>
        </div>
      );
    });

  // total page: 500
  const pageCount = Math.ceil(gamesData.length / PER_PAGE);

  /** Pagination Part */

  if (loading) {
    return <h3>Loading...</h3>;
  }

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
          <label htmlFor="ssnFilter">Seasons Filter</label>
          <br />
          <select
            name="ssnFilter"
            value={seasonState}
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

      {currentPageData}

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link__disabled"}
        activeClassName={"pagination__link__active"}
      />
    </>
  );
};

export default Games;
