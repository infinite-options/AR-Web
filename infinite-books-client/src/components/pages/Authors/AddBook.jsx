/*
TODO: 
  - add checks for file uploads. don't let users upload wrong type or huge files.
  - snackbar not giving "good job" message on 200OK
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// MUI
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Icons
import { IconContext } from "react-icons/lib";
import { FaPlusSquare } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: 20,
    margin: 15,
    display: "flex",
    textAlign: "center",
    cursor: "pointer",
  },
  publishBookText: {
    color: "#004d40",
    paddingLeft: "12px",
    fontSize: 15,
  },
  modalContainer: {
    display: "flex",
    margin: "0 auto",
    marginTop: 150,
    height: 370,
    width: 600,
    padding: 10,
    position: "relative",
  },
  modalCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
  },
  modalImageContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "20%",
    flex: 1,
    height: "90%",
    float: "left",
  },
  modalImageDiv: {
    fontStyle: "italic",
    textAlign: "center",
    height: 220,
    width: 160,
    border: "1px dotted teal",
    fontSize: 8,
    marginTop: 10,
    marginLeft: 4,
  },
  modalInputsDiv: {
    width: "75%",
    display: "inline-block",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 1,
  },
  modalTextfield: {
    width: "80%",
    padding: 2,
    margin: 12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddBook = (props) => {
  const classes = useStyles();

  // Gets user_uid from cookies. Consider getting from authcontext.
  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

  const [openModal, setOpenModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [error, setError] = React.useState("");

  const [status, setStatus] = React.useState("");
  const [tempImgFile, setTempImgFile] = useState("");
  const [pdfFilename, setPdfFilename] = useState("");
  const [imgFile, setImgFile] = useState({ obj: undefined, url: "" });
  const [pdfFile, setPdfFile] = useState({ obj: undefined, url: "" });

  useEffect(() => {}, [imgFile, pdfFile]);

  const handleOpenSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    clear();
  };

  const [post, setPost] = useState({
    title: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  const clear = () => {
    setPost({
      title: "",
      genre: "",
      description: "",
    });
    setImgFile({ obj: undefined, url: "" });
    setPdfFile({ obj: undefined, url: "" });
    setTempImgFile("");
    setPdfFilename("");
    setError("");
  };

  const postNewBook = () => {
    const post_url = process.env.REACT_APP_SERVER_BASE_URI + "InsertNewBook";
    /*
        {
            "title":"test",
            "book_cover_image":"",
            "author_uid":"100-000002",
            "genre":"None",
            "num_pages":"10000000000",
            "description":"testing",
            "format":"paper",
            "book_link":"blah"
        }
    */

    let bookInfo = {
      title: post.title,
      book_cover_image: imgFile.obj,
      author_uid: uid,
      genre: post.genre,
      num_pages: "", // determined dynamically when PDF loads
      description: post.description,
      format: "pdf", // if we ever allow uploads in other formats, don't hard code this
      book_pdf: pdfFile.obj,
    };

    if (verifyBookInfo(bookInfo)) {
      let formData = new FormData();
      console.log(bookInfo);
      Object.entries(bookInfo).forEach((entry) => {
        formData.append(entry[0], entry[1]);
      });
      axios
        .post(post_url, formData)
        .then((res) => {
          console.log(res);
          let arr = [{ message: res.data.message }];
          console.log(arr);
          setStatus(res.status);
          bookInfo.book_pdf = pdfFile.url;
          bookInfo.book_cover_image = imgFile.url;
          props.setBooks((books) => [...books, bookInfo]);
          //handleOpenSnackbar();
        })
        .catch((err) => {
          console.error(err);
        });

      handleCloseModal();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setTempImgFile(URL.createObjectURL(file));
      setImgFile({ obj: file, url: URL.createObjectURL(file) });
    } else if (file.type === "application/pdf") {
      setPdfFile({ obj: file, url: URL.createObjectURL(file) });
      setPdfFilename(file.name);
    } else {
      console.error(file.type, ": this file type is not supported.");
    }
    console.log(imgFile);
  };

  const verifyBookInfo = (bookInfo) => {
    let goodToGo = true;
    if (bookInfo.title === "") {
      setError("A book title is required");
      goodToGo = false;
    }

    if (bookInfo.book_pdf === undefined) {
      setError("Upload a book");
      goodToGo = false;
    }

    return goodToGo;
  };

  // consider making errors an array and then mapping them to <li>
  const showErrors = () => {
    return (
      <Typography variant="subtitle1" style={{ color: "red" }}>
        {error}
      </Typography>
    );
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
              {post.title} published successfully!
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

  return (
    <IconContext.Provider value={{ color: "#309aac" }}>
      <Grid container>
        <Paper className={classes.paper} onClick={handleOpenModal}>
          <FaPlusSquare size={22} />
          <span className={classes.publishBookText}> Publish new book </span>
        </Paper>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Paper elevation={3} className={classes.modalContainer}>
            <AiFillCloseSquare
              size={32}
              onClick={handleCloseModal}
              className={classes.modalCloseIcon}
            />
            <div className={classes.modalImageContainer}>
              <div className={classes.modalImageDiv}>
                {tempImgFile !== "" && (
                  <img
                    src={tempImgFile}
                    alt=""
                    style={{ height: "220px", width: "160px" }}
                  />
                )}
              </div>

              <Button
                size="small"
                variant="contained"
                component="label"
                color="primary"
                style={{ marginTop: 20 }}
              >
                {tempImgFile === "" ? (
                  <span>Add cover image</span>
                ) : (
                  <span> Change cover image</span>
                )}
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="uploadedPhoto"
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                />
              </Button>

              {tempImgFile !== "" && (
                <Button
                  size="small"
                  variant="contained"
                  component="label"
                  color="secondary"
                  style={{ marginTop: 5 }}
                  onClick={() => setTempImgFile("")}
                >
                  Remove Cover Image
                </Button>
              )}

              <Button
                size="small"
                variant="contained"
                component="label"
                color="primary"
                style={{ marginTop: 20 }}
              >
                {pdfFilename === "" ? (
                  <span>Upload book PDF</span>
                ) : (
                  <span> Change book PDF</span>
                )}
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="uploadedPdf"
                  accept="application/pdf"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography variant="subtitle1" style={{ marginTop: 4 }}>
                {pdfFilename}
              </Typography>
            </div>
            <div className={classes.modalInputsDiv}>
              <TextField
                className={classes.modalTextfield}
                id="textfield-title"
                name="title"
                label="Title"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.modalTextfield}
                id="textfield-genre"
                name="genre"
                label="Genre"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.modalTextfield}
                id="textfield-description"
                name="description"
                label="Description"
                autoComplete="off"
                variant="outlined"
                multiline
                rows={4}
                onChange={handleChange}
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => postNewBook()}
              >
                Publish
              </Button>
              <div style={{ marginTop: 10 }}>{showErrors()}</div>
            </div>
          </Paper>
        </Fade>
      </Modal>
      {showSnackbar()}
    </IconContext.Provider>
  );
};
export default AddBook;
