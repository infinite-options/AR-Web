import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { Button } from "./Button";
// Icons
import { FaBars, FaTimes } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#309aac" }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiSpellBook className="navbar-icon" />
              Infinite Books
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/books"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Books
                </Link>
              </li>
              <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/authors" className="nav-links">
                  Authors
                </Link>
              </li>
              <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/readers" className="nav-links">
                  Readers
                </Link>
              </li>
              <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/forum" className="nav-links">
                  Forum
                </Link>
              </li>
              <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/about" className="nav-links">
                  About
                </Link>
              </li>
              <li className="nav-btn" onClick={closeMobileMenu}>
                {button ? (
                  <Link to="/sign-up" className="btn-link">
                    <Button buttonStyle="btn--outline">Sign Up</Button>
                  </Link>
                ) : (
                  <Link to="/sign-up" className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
