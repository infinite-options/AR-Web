import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./components/navbar";
import ReactPlayer from "react-player";
import { Parallax } from "react-parallax";

// MUI
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Images & icons
import book1 from "./images/book1.jpg";
import book2 from "./images/book2.jpg";
import lib from "./images/lib.jpg";
import ShareIcon from "@material-ui/icons/Share";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import ReaderDashboard from "./components/readerdashboard";

/*
TODOs:

Make card area clickable 
(https://stackoverflow.com/questions/49007357/how-to-make-the-whole-card-component-clickable-in-material-ui-using-react-js)

Fix nav bar squishing

Fix share button (if it stays in the next iteration
*/

const styles = {
  headline: {
    fontFamily: "Dancing Script",
    fontSize: 60,
    fontWeight: "bolder",
    color: "#309aac",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Caveat",
    color: "#309aac",
    textAlign: "center",
    fontSize: 20,
  },
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
    color: "#309aac",
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
    height: "730px",
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
  bottomDiv: {
    height: 300,
    width: 1360,
    backgroundColor: "#e7f1f0",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#092f37",
    marginTop: 75,
  },
  mailingListDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  joinMailingText: {
    marginTop: 50,
    marginRight: 40,
    fontWeight: "bold",
  },
  mailingTextField: {
    marginTop: 30,
    marginRight: 10,
  },
};

function App() {

  const url = ""; // TODO
  const [result, setPost] = useState({
    business_uid: "",
    business_type: "",
    business_type2: ""
  });
  const clear = () => {
    setResult([]);
    setPost({business_type: "", business_uid: "", business_type2: ""}); // TODO
  };
  const sendGetSlash = e => {
    const get_url = url + e.target.value;
    console.log(get_url);
    axios.get(get_url).then(res => {
      console.log(res);
      setResult(res.data.result);
    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleChange = e => {
    e.persist();
    setPost({...post, [e.target.name]: e.target.value});
    console.log(post);
  };

  const sendPostParam = e => {
    const get_url = url + e.target.value;
    console.log(get_url);
    axios.post(`${get_url}/${post.business_type}`) // TODO
    .then(res => {
      console.log(res);
      let arr = [{message: res.data.message}];
      setResult(arr);
    }).catch(err => {
      console.error(err);
    });
  };

  const sendPostArgs = e => {
    const get_url = url + e.target.value;
    console.log(get_url);
    let x = { 
      business_uid: post.business_uid,
      business_type: post.business_type2
    };
    console.log(x);
    axios.post(get_url, x)
    .then(res => {
      console.log(res);
      let arr = [{message: res.data.message}];
      setResult(arr);
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <div className="App">
      <div style={styles.headline}>Infinite Books</div>
      <div style={styles.subtitle}>
        All the reading and writing your heart desires
      </div>

      <Divider variant="middle" style={styles.divider} />
      <NavBar />
      <Divider variant="middle" style={styles.divider} />

      <p style={styles.headline2}>For writers, a place to get meaningful user and data driven feedback on your work.<br />
      For readers, a source for books for you to fall in love with and help improve.</p>
      <p style={styles.headline3}>“A reader lives a thousand lives before he dies... The man who never reads lives only one.” – George R.R. Martin </p>

      <ReaderDashboard />

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
              <ReactPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingTop: "40px",
                }}
              />
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
          <div style={styles.bottomDiv}>
            <Grid container style={styles.mailingListDiv}>
              <Grid item>
                <Typography variant="h5" style={styles.joinMailingText}>
                  Join Our Mailing List
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="standard-required"
                  label="Enter your email here"
                  style={styles.mailingTextField}
                />
              </Grid>
              <Grid item>
                <Button style={styles.readMoreButton} variant="contained">
                  Subscribe Now
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
