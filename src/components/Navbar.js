import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <Link to="/">Photo Size Editor</Link>
    </header>
  );
}

export default Navbar;
