import React from "react";
import "./App.css";
import { Route, HashRouter } from "react-router-dom";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/readerdashboard";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Books from "./components/pages/Books/Books";
import Signup from "./components/Signup";
import Author from "./components/author";

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
      <HashRouter>
        <Navbar />
        <hr variant="middle" style={styles.hr} />
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/readers" exact component={ReaderDashboard} />
          <Route path="/books" exact component={Books} />
          <Route path="/authors" exact component={Author} />
          <Route path="/sign-up" exact component={Signup} />
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
