import React from "react";
import "./App.css";
import { Route, HashRouter } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/ReaderDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const styles = {
  divider: {
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
        <Divider variant="middle" style={styles.divider} />
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/readers" exact component={ReaderDashboard} />
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
