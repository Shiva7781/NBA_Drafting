import React from "react";
import "./NavbarNBA.css";
import { Link } from "react-router-dom";

const NavbarNBA = () => {
  return (
    <>
      <div className="Nav">
        <Link to="/players">Players</Link>
        <Link to="/games">Games</Link>
      </div>
    </>
  );
};

export default NavbarNBA;
