import React from "react";
import "./App.css";
//import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Parallax } from "react-parallax";
import Divider from "@material-ui/core/Divider";

// components
import Home from "./components/pages/HomePage/Home";
import ReaderDashboard from "./components/ReaderDashboard";
import Navbar from "./components/Navbar";

// MUI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// Images & icons
import book1 from "./images/book1.jpg";
import book2 from "./images/book2.jpg";
import lib from "./images/lib.jpg";
import ShareIcon from "@material-ui/icons/Share";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Footer from "./components/Footer";

const styles = {
  divider: {
    marginTop: 10,
    marginBottom: 10,
    background: "#a7dee8",
    height: "1px",
  },
  headline2: {
    fontFamily: "Times New Roman",
    fontSize: 20,
    fontWeight: "bolder",
    color: "#31555c",
    textAlign: "center",
    marginTop: 50,
  },
  headline3: {
    fontFamily: "Dancing Script",
    fontSize: 20,
    color: "#309aac",
    textAlign: "center",
    marginBottom: 50,
  },
  Card: {
    margin: 4,
    marginTop: 10,
    color: "#309aac",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
  },
  gridText: {
    margin: 4,
    marginTop: 10,
    color: "#309aac",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
  },
  img: {
    width: "380px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  parallaxContainer: {},
  whyJoinDiv: {
    height: "340px",
    width: "915px",
    backgroundColor: "#e7f1f0",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  whyJoinBodyText: {
    width: "460px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 25,
  },
  videoShareDiv: {
    height: "40px",
    width: "640px",
    backgroundColor: "#092f37",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  readMoreButton: {
    textTransform: "none",
    backgroundColor: "#309aac",
    color: "white",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
  },
  raveReviewsText: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 10,
    fontWeight: "bold",
  },
  reviewCardContainer: {
    flexGrow: 1,
  },
  reviewCard: {
    margin: 4,
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
  },
};

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Divider variant="middle" style={styles.divider} />

        <ReaderDashboard />

        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>

        <Grid container>
          <Grid item xs={6}>
            <Card style={styles.Card}>
              <CardActionArea>
                <CardContent>
                  <Typography style={styles.gridText}>
                    Authors Sign in Here
                  </Typography>
                  <CardMedia
                    component="img"
                    alt=""
                    style={styles.img}
                    image={book1}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card style={styles.Card}>
              <CardActionArea>
                <CardContent>
                  <Typography style={styles.gridText}>
                    Readers Sign in Here
                  </Typography>
                  <CardMedia
                    component="img"
                    alt=""
                    style={styles.img}
                    image={book2}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} style={styles.parallaxContainer}>
            <Parallax bgImage={lib} strength={900}>
              <div style={styles.whyJoinDiv}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", paddingTop: 50 }}
                >
                  Why Join Infinite Books?
                </Typography>
                <Typography variant="body2" style={styles.whyJoinBodyText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                {/* <ReactPlayer
                url="http://www.youtube.com/watch?v=dQw4w9WgXcQ"
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingTop: "40px",
                }}
              /> */}
                <div style={styles.videoShareDiv}>
                  <IconButton aria-label="share">
                    <ShareIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
                <Button style={styles.readMoreButton} variant="contained">
                  Read More
                </Button>
              </div>
            </Parallax>

            <Typography variant="h4" style={styles.raveReviewsText}>
              Rave Reviews
            </Typography>
            <Grid container>
              <Grid item xs={4}>
                <Card style={styles.reviewCard}>
                  <CardContent>
                    <FormatQuoteIcon
                      fontSize="large"
                      style={{ color: "#309aac" }}
                    />
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quos blanditiis tenetur unde suscipit, quam beatae rerum
                      inventore consectetur, neque doloribus, cupiditate numquam
                      dignissimos laborum fugiat deleniti? Eum quasi quidem
                      quibusdam.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card style={styles.reviewCard}>
                  <CardContent>
                    <FormatQuoteIcon
                      fontSize="large"
                      style={{ color: "#309aac" }}
                    />
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quos blanditiis tenetur unde suscipit, quam beatae rerum
                      inventore consectetur, neque doloribus, cupiditate numquam
                      dignissimos laborum fugiat deleniti? Eum quasi quidem
                      quibusdam.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card style={styles.reviewCard}>
                  <CardContent>
                    <FormatQuoteIcon
                      fontSize="large"
                      style={{ color: "#309aac" }}
                    />
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quos blanditiis tenetur unde suscipit, quam beatae rerum
                      inventore consectetur, neque doloribus, cupiditate numquam
                      dignissimos laborum fugiat deleniti? Eum quasi quidem
                      quibusdam.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
