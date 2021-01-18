import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/ReaderDashboard";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Books from "./components/pages/Books/Books";
import Signup from "./components/Signup";
import AuthorDashboard from "./components/AuthorDashboard";
import ReadingPane from "./components/ReadingPane";

const styles = {
  hr: {
    marginTop: 10,
    marginBottom: 10,
    background: "#a7dee8",
    height: "1px",
  },
};

function App() {
  return (
    <div className="App">
      <Navbar />
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
    </div>
  );
}

export default App;
