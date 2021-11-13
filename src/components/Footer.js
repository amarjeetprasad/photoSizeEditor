import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  useEffect(() => {
    document.querySelector("#link1").addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
    document.querySelector("#link2").addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }, []);
  return (
    <>
      <div className="footer-container">
        <Link to="/privacy" id="link1">
          Privacy Notice
        </Link>
        <Link to="/contact" id="link2">
          Contact Us
        </Link>
        {/* <Link to="/about">About Us</Link> */}
      </div>
    </>
  );
}
export default Footer;
