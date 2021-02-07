import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext } from "./AuthContext";
import axios from "axios";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/ReaderDashboard";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Books from "./components/pages/Books/Books";
import Signup from "./components/Signup";
import AuthorDashboard from "./components/AuthorDashboard";
import ReadingPane from "./components/ReadingPane";

const cookies = new Cookies();

const styles = {
  hr: {
    marginTop: 10,
    marginBottom: 10,
    background: "#a7dee8",
    height: "1px",
  },
};

function App() {
  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

  const [accountType, setAccountType] = useState();
  const [isAuth, setIsAuth] = useState(uid === "" ? false : true);
  const [authLevel, setAuthLevel] = useState();
  const [username, setUsername] = useState("");

  /* Auth levels:
  Admin:  4
  Both:   3
  Author: 2
  Reader: 1
  Nobody: 0
  */

  const BASE_URL =
    "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/OneUserArg/";

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    axios
      .get(BASE_URL + cookies.get("user_uid"))
      .then((response) => {
        console.log("Account:", response);
        let newAccountType = response.data.result[0].role.toLowerCase();
        if (isMounted) {
          setAccountType(response.data.result[0].role ? newAccountType : "");
          setUsername(response.data.result[0].username);
        }
        let newAuthLevel = (() => {
          //console.log(newAccountType);
          switch (newAccountType) {
            case "admin":
              return 4;
            case "both":
              return 3;
            case "author":
              return 2;
            case "reader":
              return 1;
            default:
              return 0;
          }
        })();
        //console.log(newAuthLevel);
        if (isMounted) setAuthLevel(newAuthLevel);
      })
      .catch((err) => {
        console.log(err.response || err);
      });
    return () => {
      isMounted = false;
    };
  }, [isAuth]);

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{
            isAuth,
            setIsAuth,
            authLevel,
            setAuthLevel,
            username,
            setUsername,
          }}
        >
          <Navbar isAuth={isAuth} authLevel={authLevel} />
          <hr variant="middle" style={styles.hr} />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/readers" exact component={ReaderDashboard} />
              <Route path="/books" exact component={Books} />
              <Route path="/authors" exact component={AuthorDashboard} />
              <Route path="/sign-up" exact component={Signup} />
              <Route path="/readingpane" exact component={ReadingPane} />
            </Switch>
          </div>
          <Footer />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
