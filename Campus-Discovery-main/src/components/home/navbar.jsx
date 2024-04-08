import React from "react";
import  "./navbar.css";
import { Link } from "react-router-dom";

function Navbar () {
    return (
      <div className="navbar">
        <nav>
          <img
            className="navimg"
            src="https://seeklogo.com/images/G/georgia-tech-yellowjackets-logo-909E576F48-seeklogo.com.png"
          />
          <div className="navitems">
            <ul id="navbar">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/signUp"}>Sign Up</Link>
              </li>
              <li>
                <Link to={"/events"}>Events</Link>
              </li>
              <li>
                <Link to={"/map"}>Map</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Navbar;