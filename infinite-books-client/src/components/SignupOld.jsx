// First version of signup, ui only

import React, { useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Link } from "react-router-dom";

// MUI
import { Button as MuiButton, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
// Icons & images
import { FaGoogle, FaFacebookF, FaApple, FaEnvelope } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const styles = {
  container: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    //border: "1px solid gray",
    height: "500px",
    textAlign: "center",
    justifyContent: "center",
    padding: 15,
    margin: "auto",
    backgroundColor: "#e0f2f1",
    borderRadius: 5,
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    width: "65%",
    padding: "2px",
  },
  emailSignIn: {
    width: "50%",
    borderRight: "1px solid lightgray",
  },
  input: {
    width: "75%",
    margin: 2,
    padding: 5,
    marginBottom: 20,
  },
  buttonGroup: {
    width: 225,
    height: "auto",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 50,
  },
  button: {
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
  terms: {
    fontSize: 14,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
};

function Signup() {
  const url =
    "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/SignUp"; // TODO

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

  // For text fields
  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  const sendPostArgs = (e) => {
    // https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/SignUp
    const post_url = url + e.target.value;
    console.log(post_url);
    let payload = {
      /*
      {   
        "username":"testing",   
        "first_name":"te",   
        "last_name":"st",   
        "role":"testingrole",   
        "email":"vwxyz@gmail.com",   
        "phone":"4084084088",   
        "interest":"good books",   
        "hours":"10",   
        "favorites":"fantasy",   
        "social":"FALSE",   
        "access_token":"NULL",   
        "refresh_token":"NULL",   
        "password":"123456" 
      }
 */

      username: "Testy",
      first_name: "Test",
      last_name: "Ing",
      role: "Tester",
      email: post.email,
      phone: "1",
      interest: "Sci Fi",
      hours: "1",
      favorites: "None",
      social: "FALSE",
      access_token: "NULL",
      refresh_token: "NULL",
      password: post.password,
    };
    console.log(payload);
    axios
      .post(post_url, payload)
      .then((res) => {
        console.log(res);
        let arr = [{ message: res.data.message }];
        console.log(arr);
      })
      .catch((err) => {
        console.error(err);
      });
    clear();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#309aac" }}>
        {/* outmost container */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={styles.container}
        >
          <Paper elevation={3} style={styles.inputDiv}>
            <div style={styles.emailSignIn}>
              <FaEnvelope size={32} style={{ margin: 5 }} />
              <p style={{ fontSize: 24 }}>Register With Email</p>
              <p>Email address:</p>

              <input
                name="email"
                type="email"
                style={styles.input}
                value={post.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <p>Password:</p>
              <input
                name="password"
                type="password"
                style={styles.input}
                value={post.password}
                placeholder="Password"
                onChange={handleChange}
              />

              <Button
                buttonStyle="btn--primary"
                name="submitButton"
                value="/api/v2/SignUp"
                onClick={sendPostArgs}
              >
                Create Account
              </Button>
            </div>
            <div style={styles.buttonGroup}>
              <p style={{ fontSize: 22, marginBottom: 30 }}>Or...</p>
              <MuiButton
                variant="contained"
                color="default"
                style={styles.button}
                startIcon={<FaGoogle />}
              >
                Register With Google
              </MuiButton>
              <MuiButton
                variant="contained"
                color="default"
                style={styles.button}
                startIcon={<FaFacebookF />}
              >
                Register With Facebook
              </MuiButton>
              <MuiButton
                variant="contained"
                color="default"
                style={styles.button}
                startIcon={<FaApple />}
              >
                Register With Apple
              </MuiButton>
            </div>

            <div style={styles.terms}>
              <p style={{ fontSize: 10 }}>
                By registering an account you agree to our{" "}
                <Link to="/">Terms of Use</Link> and{" "}
                <Link to="/">Privacy Policy.</Link>
              </p>
            </div>
          </Paper>
        </Grid>
      </IconContext.Provider>
    </>
  );
}

export default Signup;
