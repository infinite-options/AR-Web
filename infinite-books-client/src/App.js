import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext } from "./components/Auth/AuthContext";
import axios from "axios";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/pages/Readers/ReaderDashboard";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Books from "./components/pages/Books/Books";
import Signup from "./components/Auth/Signup";
import AuthorDashboard from "./components/pages/Authors/AuthorDashboard";
import ReadingPane from "./components/pages/Readers/ReadingPane";

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
  let uid =
    cookies.get("user_uid") === undefined ? "" : cookies.get("user_uid");

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

  const get_user_url = process.env.REACT_APP_SERVER_BASE_URI + "OneUserArg/";

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    axios
      .get(get_user_url + cookies.get("user_uid"))
      .then((response) => {
        console.log("Account:", response);
        let newAccountType = response.data.result[0]
          ? response.data.result[0].role.toLowerCase()
          : undefined;
        if (isMounted && response.data.result[0]) {
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
