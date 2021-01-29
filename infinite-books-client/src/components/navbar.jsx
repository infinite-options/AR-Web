// TODO: redirect after login

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Cookies from "js-cookie";

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
import axios from "axios";

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

function NavBar(props) {
  const [open, setOpen] = React.useState(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  // const [errorValue, setError] = useState(false);
  // const [error, RaiseError] = useState(null);

  const handleClick = () => {
    setClick(!click);
  };

  // For text fields
  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const API_URL =
    "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/"; // TODO

  const [post, setPost] = useState({
    email: "",
    password: "",
  });

  const clear = () => {
    setPost({
      email: "",
      password: "",
    });
  };

  const handleEmailChange = (e) => {
    // console.log('email is changing')
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    // console.log('password is changing')
    setPassword(e.target.value);
  };

  // code lifted from
  // https://github.com/infinite-options/serving-fresh-react-admin/blob/master/src/admin/AdminLogin.js
  const verifyLoginInfo = (e) => {
    // https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt
    let payload = {
      email: emailValue,
    };
    console.log(payload);
    axios
      .post(API_URL + "AccountSalt", payload)
      .then((res) => {
        let saltObject = res;

        if (!(saltObject.data.code && saltObject.data.code !== 280)) {
          let hashAlg = saltObject.data.result[0].password_algorithm;
          let salt = saltObject.data.result[0].password_salt;

          if (hashAlg != null && salt != null) {
            // Make sure the data exists
            if (hashAlg !== "" && salt !== "") {
              // Rename hash algorithm so client can understand
              switch (hashAlg) {
                case "SHA512":
                  hashAlg = "SHA-512";
                  break;
                default:
                  break;
              }

              // Salt plain text password
              let saltedPassword = passwordValue + salt;

              // Encode salted password to prepare for hashing
              const encoder = new TextEncoder();
              const data = encoder.encode(saltedPassword);
              //Hash salted password
              crypto.subtle.digest(hashAlg, data).then((res) => {
                let hash = res;
                // Decode hash with hex digest
                let hashArray = Array.from(new Uint8Array(hash));
                let hashedPassword = hashArray
                  .map((byte) => {
                    return byte.toString(16).padStart(2, "0");
                  })
                  .join("");

                let loginObject = {
                  email: emailValue,
                  password: hashedPassword,
                  social_id: "",
                  signup_platform: "",
                };

                axios
                  .post(API_URL + "Login", loginObject, {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                  })
                  .then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                      console.log("Login success");
                      let userInfo = res.data.result[0];
                      document.cookie = "user_uid=" + userInfo.user_uid;
                      Cookies.set("login-session", "good");
                    } else if (res.data.code === 406 || res.data.code === 404) {
                      console.log("Invalid credentials.");
                    } else if (res.data.code === 401) {
                      console.log("Need to log in by social media.");
                    } else {
                      console.log(
                        "Unknown login error, please try again later."
                      );
                    }
                  })
                  .catch((err) => {
                    // Log error for Login endpoint
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          } else {
            // No hash/salt information, probably need to sign in by socail media
            console.log("Salt not found");
            // Try to login anyway to confirm
            let loginObject = {
              email: emailValue,
              password: "test",
              token: "",
              signup_platform: "",
            };

            axios
              .post(API_URL + "Login", loginObject, {
                headers: {
                  "Content-Type": "text/plain",
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data.code === 401) {
                  console.log("Need to log in by social media");
                } else {
                  console.log("Unknown login error");
                }
              })
              .catch((err) => {
                // Log error for Login endpoint
                if (err.response) {
                  console.log(err.response);
                }
                console.log(err);
              });
          }
        } else {
          // No information, probably because invalid email
          console.log("Invalid credentials");
        }
      })
      .catch((err) => {
        // Log error for account salt endpoint
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
    clear();
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
              {/* <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/forum" className="nav-links">
                  Forum
                </Link>
              </li>
              <li className="nav-item" onClick={closeMobileMenu}>
                <Link to="/about" className="nav-links">
                  About
                </Link>
              </li> */}
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
                  value={emailValue}
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
                <p>Password:</p>
                <input
                  name="password"
                  type="password"
                  style={styles.input}
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  // onChange={handleChange}
                />
                <p></p>
                <Button buttonStyle="btn--primary" onClick={verifyLoginInfo}>
                  Sign In
                </Button>
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
