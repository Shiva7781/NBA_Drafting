import React, { useEffect, useState } from "react";
import "./Players.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./PaginationComp.css";

const Players = () => {
  const [loading, setLoading] = useState(true);
  const [playersData, setPlayersData] = useState([]);
  // console.log("PlayersData:", playersData);

  const [searchName, setSearchName] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    displayPlayes();
  }, []);

  const displayPlayes = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?per_page=100`)
      .then((res) => {
        // console.log(res.data.data);

        setTimeout(() => {
          setPlayersData(res.data.data);
          setLoading(false);
        }, 777);
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

    selected === i ? setSelected(null) : setSelected(i);
  };

  /** Pagination Part */

  const PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: selectedPage }) => {
    // console.log("selectedPage:", selectedPage);
    setCurrentPage(selectedPage);
  };

  // 0, 10, 20, 30...
  const offset = currentPage * PER_PAGE;
  // console.log("offset:", offset);

  const currentPageData = playersData
    .slice(offset, offset + PER_PAGE)
    .map((e, i) => (
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

        <div className={selected === i ? "DetailsDiv" : "NO_DetailsDiv"}>
          <h2>Team Details</h2>
          <p>Team: {e.team["full_name"]}</p>
          <p>Abbr: {e.team["abbreviation"]}</p>
          <p>Conference: {e.team["conference"]}</p>
          <p>Division: {e.team["division"]}</p>
          <p>City: {e.team["city"]}</p>
        </div>
      </div>
    ));

  // total page: 500
  const pageCount = Math.ceil(playersData.length / PER_PAGE);

  /** Pagination Part */

  if (loading) {
    return <h3>Loading...</h3>;
  }

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

      <div className="Players">{currentPageData}</div>

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

export default Players;
