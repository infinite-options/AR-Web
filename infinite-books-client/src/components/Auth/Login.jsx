/*
Login component is called by navbar.jsx

A lot of code respectfully borrowed from sister site at:
https://github.com/infinite-options/serving-fresh-react-admin/blob/master/src/admin/AdminLogin.js
TODO: enter keypress submits form
TODO maybe: the implementation of  the role system.
authors should be able to see and check out books imo, so the "author" and "both"
roles do the same thing. I would like to reevaluate whether or not the "both" role
is necessary at a future date.
*/

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

// Icons
import { FaGoogle, FaFacebookF, FaApple, FaEnvelope } from "react-icons/fa";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button as MuiButton, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

const Login = (props) => {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_SERVER_BASE_URI;

  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [errorValue, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // TODO: uncomment this stuff when implementing apple login
    // if (
    //   process.env.REACT_APP_APPLE_CLIENT_ID &&
    //   process.env.REACT_APP_APPLE_REDIRECT_URI
    // ) {
    //   window.AppleID.auth.init({
    //     clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
    //     scope: "email",
    //     redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
    //   });
    // }
    // Note: search query parameters used for Apple Login
    let queryString = props.location.search;
    let urlParams = new URLSearchParams(queryString);
    // Clear Query parameters
    window.history.pushState({}, document.title, window.location.pathname);
    // console.log(props,urlParams)
    // Successful Log in with Apple, set cookies, context, redirect
    if (urlParams.has("id")) {
      let customerId = urlParams.get("id");
      Auth.setIsAuth(true);
      Cookies.set("login-session", "good");
      Cookies.set("customer_uid", customerId);
      axios
        .get(process.env.REACT_APP_SERVER_BASE_URI + "Profile/" + customerId)
        .then((response) => {
          console.log("Account:", response);
          let newAccountType = response.data.result[0].role.toLowerCase();
          switch (newAccountType) {
            case "admin":
              Auth.setAuthLevel(4);
              props.history.push("/admin");
              break;
            case "both":
              Auth.setAuthLevel(3);
              props.history.push("/authors");
              break;
            case "author":
              Auth.setAuthLevel(2);
              props.history.push("/authors");
              break;
            case "reader":
              Auth.setAuthLevel(1);
              props.history.push("/readers");
              break;
            default:
              Auth.setAuthLevel(0);
              props.history.push("/");
              break;
          }
        })
        .catch((err) => {
          console.log(err.response || err);
        });
      props.history.push("/admin");
    }
    // Log which media platform user should have signed in with instead of Apple
    // May eventually implement to display the message for which platform to Login
    else if (urlParams.has("media")) {
      console.log(urlParams.get("media"));
    }
  }, []);

  useEffect(() => {
    // TODO: uncommment when implementing apple login
    // if (
    //   process.env.REACT_APP_APPLE_CLIENT_ID &&
    //   process.env.REACT_APP_APPLE_REDIRECT_URI
    // ) {
    //   window.AppleID.auth.init({
    //     clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
    //     scope: "email",
    //     redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
    //   });
    // }
    let queryString = props.location.search;
    let urlParams = new URLSearchParams(queryString);
    // Clear Query parameters
    window.history.pushState({}, document.title, window.location.pathname);
    //console.log(props, urlParams);
    // Successful Log in with Apple, set cookies, context, redirect
    if (urlParams.has("id")) {
      let customerId = urlParams.get("id");
      Auth.setIsAuth(true);
      Cookies.set("login-session", "good");
      Cookies.set("customer_uid", customerId);
      props.history.push("/admin");
    }
    // Log which media platform user should have signed in with instead of Apple
    // May eventually implement to display the message for which platform to Login
    else if (urlParams.has("media")) {
      console.log(urlParams.get("media"));
    }
  }, []);

  // For text fields
  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

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
                      setError("");
                      console.log("Login success");
                      let userInfo = res.data.result[0];
                      Auth.setIsAuth(true);
                      Auth.setUsername(userInfo.username);
                      Cookies.set("login-session", "good");
                      Cookies.set("user_uid", userInfo.user_uid);
                      props.closeHandler();
                      let accountType = userInfo.role.toLowerCase();
                      switch (accountType) {
                        case "admin":
                          Auth.setAuthLevel(4);
                          props.history.push("/admin");
                          break;
                        case "both":
                          Auth.setAuthLevel(3);
                          props.history.push("/authors");
                          break;
                        case "author":
                          Auth.setAuthLevel(2);
                          props.history.push("/authors");
                          break;
                        case "reader":
                          Auth.setAuthLevel(1);
                          props.history.push("/readers");
                          break;
                        default:
                          Auth.setAuthLevel(0);
                          props.history.push("/");
                          break;
                      }
                    } else if (res.data.code === 406 || res.data.code === 404) {
                      console.log("Invalid credentials.");
                      setError("credential");
                      setErrorMessage("Invalid credentials.");
                    } else if (res.data.code === 401) {
                      console.log("Need to log in by social media.");
                      setError("social");
                      setErrorMessage(res.data.message);
                    } else if (res.data.code === 407) {
                      console.log("Need email verification");
                      setError("email_verify");
                      axios
                        .post(
                          process.env.REACT_APP_SERVER_BASE_URI +
                            "email_verification",
                          { email: emailValue },
                          {
                            headers: {
                              "Content-Type": "text/plain",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res);
                          setErrorMessage(
                            "Email not verified. Check your email to get link for verification."
                          );
                        })
                        .catch((err) => {
                          setErrorMessage("Email not verified.");
                          if (err.response) {
                            console.log(err.response);
                          }
                          console.log(err);
                        });
                    } else {
                      console.log("Unknown login error.");
                      setError("unknown");
                      setErrorMessage(res.data.message);
                    }
                  })
                  .catch((err) => {
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          } else {
            // No hash/salt information, probably need to sign in by social media
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
                if (res.data.code === 404) {
                  console.log("Invalid credentials");
                  setError("credential");
                  setErrorMessage("Invalid credentials.");
                } else {
                  console.log("Unknown login error");
                  setError("unknown");
                  setErrorMessage("Login failed, please try again later.");
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
        } else if (res.data.code === 401) {
          console.log("Use Social Login");
          setError("social");
          let socialMediaUsed = res.data.result[0].user_social_media;
          let socialMediaUsedFormat =
            socialMediaUsed.charAt(0) + socialMediaUsed.slice(1).toLowerCase();
          let newErrorMessage = "Use " + socialMediaUsedFormat + " to login.";
          setErrorMessage(newErrorMessage);
        } else if (res.data.code === 404) {
          // No information, probably because invalid email
          console.log("Invalid credentials");
          setError("credential");
          setErrorMessage("Invalid credentials.");
        } else {
          console.log("Unknown log in error");
          setError("Log in failed, please try again later.");
        }
      })
      .catch((err) => {
        // Log error for account salt endpoint
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
    //clear();
  };

  const showError = () => {
    if (errorValue === "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{errorMessage}</Typography>;
  };

  return (
    <>
      <div className={classes.modalEmailSignIn}>
        <FaEnvelope size={32} style={{ margin: 5 }} />
        <p style={{ fontSize: 24 }}>Sign In With Email</p>
        <p>Email address:</p>
        <input
          name="email"
          type="email"
          className={classes.input}
          autoComplete="off"
          value={emailValue}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <p>Password:</p>
        <input
          name="password"
          type="password"
          className={classes.input}
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder="Password"
          // onChange={handleChange}
        />
        <p></p>
        <MuiButton variant="contained" onClick={verifyLoginInfo}>
          Sign In
        </MuiButton>
        <div style={{ marginTop: 10 }}>{showError()}</div>
      </div>
      <div className={classes.modalButtonGroup}>
        <MuiButton
          variant="contained"
          color="default"
          className={classes.modalButton}
          startIcon={<FaGoogle />}
        >
          Sign In With Google
        </MuiButton>
        <MuiButton
          variant="contained"
          color="default"
          className={classes.modalButton}
          startIcon={<FaFacebookF />}
        >
          Sign In With Facebook
        </MuiButton>
        <MuiButton
          variant="contained"
          color="default"
          className={classes.modalButton}
          startIcon={<FaApple />}
        >
          Sign In With Apple
        </MuiButton>
      </div>

      <div className={classes.modalRegister}>
        <Link to="/sign-up" onClick={props.closeHandler}>
          Don't have an account? Register for free.
        </Link>
      </div>
    </>
  );
};
export default withRouter(Login);
