// TODO: after submitting a comment, the textarea should be cleared

import React, { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "./PDFViewer";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
// import samplePdf from "./BalancingAct.pdf";

// mui
import Button from "@material-ui/core/Button";
import { Typography, TextField, Paper, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const cookies = new Cookies();

const styles = {
  outer: {
    display: "flex",
    justifyContent: "center",
    width: "55%",
    height: "auto",
    margin: "0 auto",
    marginBottom: 10,
  },
  inputDiv: {
    display: "inline-grid",
    padding: "10px",
    margin: "5px auto",
    height: "auto",
  },
};

function ReadingPane(props) {
  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

  const [post, setPost] = useState({
    rev_book_uid: "",
    reader_id: "",
    comments: "",
    rating_title: "",
    rating_content: "",
    page_num: "",
  });

  const [errors, setErrors] = useState("");
  const [status, setStatus] = React.useState("");

  const clear = () => {
    setPost({
      rev_book_uid: "",
      reader_id: "",
      comments: "",
      rating_title: "",
      rating_content: "",
    });
  };

  // For text fields
  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    //console.log(post);
  };

  const [pageNum, setPageNum] = useState(1);
  const pageNumCallback = (pageNumber) => {
    setPageNum(pageNumber);
  };

  const sendPostArgs = () => {
    if (post.comments === "") {
      setErrors("Please write a comment first.");
    } else {
      const review_url =
        process.env.REACT_APP_SERVER_BASE_URI + "ReviewBySingleUser/";

      let payload = {
        reader_id: uid,
        book_id: props.location.book_uid,
      };
      //console.log(payload);
      axios
        .post(review_url, payload)
        .then((res) => {
          //console.log(res);
          let review_uid = res.data.result[0].review_uid;

          const comment_url =
            process.env.REACT_APP_SERVER_BASE_URI + "NewComment";

          let second_payload = {
            comment: post.comments,
            review_uid: review_uid,
            page_num: JSON.stringify(pageNum),
          };
          //console.log(second_payload);
          axios
            .post(comment_url, second_payload)
            .then((res) => {
              //console.log(res);
              setStatus(res.status);
              if (status === 200) clear();
              handleOpenSnackbar();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    //console.log(props);
    window.scrollTo(0, 0);
  }, [props]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const showSnackbar = () => {
    if (status === 200) {
      return (
        <>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Comment posted successfully.
            </Alert>
          </Snackbar>
        </>
      );
    } else {
      return (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Something went wrong. Please try again later.
          </Alert>
        </Snackbar>
      );
    }
  };

  const showErrors = () => {
    return (
      <Typography style={{ color: "red", marginTop: 8 }}>{errors}</Typography>
    );
  };

  return (
    <>
      {props.location.pdf === undefined ? (
        <Redirect to="/readers" />
      ) : (
        <Paper style={styles.outer}>
          <div style={styles.inputDiv}>
            <TextField
              id="comments-textarea"
              name="comments"
              label="Comments"
              value={post.comments}
              placeholder="Let the author know what you think."
              multiline
              rows={20}
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 4 }}
              onClick={sendPostArgs}
            >
              Submit
            </Button>
            {showErrors()}
          </div>
          <PDFViewer pdf={props.location.pdf} pgNumCallback={pageNumCallback} />
          {showSnackbar()}
        </Paper>
      )}
    </>
  );
}

export default ReadingPane;
