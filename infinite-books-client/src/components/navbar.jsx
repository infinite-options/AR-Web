import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

import "./Navbar.css";

// Icons
import { FaBars, FaTimes } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { FaGoogle, FaFacebookF, FaApple, FaEnvelope } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

// MUI
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button as MuiButton, Paper } from "@material-ui/core";

// Note: styles for the login modal are here. Others are in Navbar.css
const styles = {
  modalContainer: {
    height: 400,
    width: 520,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "auto",
    marginTop: 100,
    padding: 10,
    position: "relative",
  },
  modalEmailSignIn: {
    width: "50%",
    borderRight: "1px solid lightgray",
  },
  input: {
    width: "75%",
    margin: 2,
    padding: 5,
    marginBottom: 20,
  },
  modalButtonGroup: {
    width: 225,
    height: "auto",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalButton: {
    textTransform: "none",
    fontSize: 14,
    backgroundColor: "#31555c",
    color: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 15,
  },
  modalRegister: {
    fontSize: 14,
    marginTop: 0,
  },
  modalCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#31555c",
    cursor: "pointer",
  },
};

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      handleOpen();
                    }}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Link to="/sign-up" className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onClick={() => {
                        closeMobileMenu();
                        handleOpen();
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper elevation={3} style={styles.modalContainer}>
              <AiFillCloseSquare
                size={32}
                onClick={handleClose}
                style={styles.modalCloseIcon}
              />
              <div style={styles.modalEmailSignIn}>
                <FaEnvelope size={32} style={{ margin: 5 }} />
                <p style={{ fontSize: 24 }}>Sign In With Email</p>
                <p>Email address:</p>
                <input
                  name="email"
                  type="email"
                  style={styles.input}
                  autoComplete="off"
                  //value={post.email}
                  placeholder="Email"
                  // onChange={handleChange}
                />
                <p>Password:</p>
                <input
                  name="password"
                  type="password"
                  style={styles.input}
                  //value={post.email}
                  placeholder="Password"
                  // onChange={handleChange}
                />
                <p></p>
                <Button buttonStyle="btn--primary">Sign In</Button>
              </div>
              <div style={styles.modalButtonGroup}>
                <MuiButton
                  variant="contained"
                  color="default"
                  style={styles.modalButton}
                  startIcon={<FaGoogle />}
                >
                  Sign In With Google
                </MuiButton>
                <MuiButton
                  variant="contained"
                  color="default"
                  style={styles.modalButton}
                  startIcon={<FaFacebookF />}
                >
                  Sign In With Facebook
                </MuiButton>
                <MuiButton
                  variant="contained"
                  color="default"
                  style={styles.modalButton}
                  startIcon={<FaApple />}
                >
                  Sign In With Apple
                </MuiButton>
              </div>

              <div style={styles.modalRegister}>
                <Link to="/sign-up" onClick={handleClose}>
                  Don't have an account? Register for free.
                </Link>
              </div>
            </Paper>
          </Fade>
        </Modal>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
