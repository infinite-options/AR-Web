// TODO: redirect after login

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Button } from "./Button";
import Login from "./Auth/Login";
import Cookies from "js-cookie";
import { AuthContext } from "./Auth/AuthContext";
import "./Navbar.css";

// Icons
import { FaBars, FaTimes } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { AiFillCloseSquare } from "react-icons/ai";

// MUI
import { Paper } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  modalCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#31555c",
    cursor: "pointer",
  },
};

function NavBar(props) {
  // state for modal open/close
  const [openModal, setOpenModal] = React.useState(false);
  // state for snackbar (success dialogue) open/close
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const Auth = useContext(AuthContext);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleLogout = () => {
    Cookies.remove("login-session");
    Cookies.remove("user_uid");
    Auth.setIsAuth(false);
    Auth.setAuthLevel(0);
    props.history.push("/");
    handleOpenSnackbar();
  };

  /* Auth levels:
  Admin:  4
  Both:   3
  Author: 2
  Reader: 1
  Nobody: 0
  */

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
              {props.authLevel > 0 && (
                <li className="nav-item">
                  <Link
                    to="/books"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Books
                  </Link>
                </li>
              )}

              {(props.authLevel === 2 || props.authLevel === 3) && (
                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link to="/authors" className="nav-links">
                    Authors
                  </Link>
                </li>
              )}

              {(props.authLevel === 1 || props.authLevel === 3) && (
                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link to="/readers" className="nav-links">
                    Readers
                  </Link>
                </li>
              )}
              <li className="nav-btn">
                {props.isAuth ? (
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      handleOpenModal();
                    }}
                  >
                    Log In / Register
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Paper elevation={3} style={styles.modalContainer}>
              <AiFillCloseSquare
                size={32}
                onClick={handleCloseModal}
                style={styles.modalCloseIcon}
              />
              <Login closeHandler={handleCloseModal} />
            </Paper>
          </Fade>
        </Modal>
      </IconContext.Provider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Logged out successfully.
        </Alert>
      </Snackbar>
    </>
  );
}

export default withRouter(NavBar);
