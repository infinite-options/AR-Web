// TODO: display image preview

import React, { useState, useEffect } from "react";
import axios from "axios";

// MUI
import { Grid, Paper, Button } from "@material-ui/core";
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
    height: 400,
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
    width: "auto",
    float: "left",
  },
  modalImageDiv: {
    fontStyle: "italic",
    textAlign: "center",
    height: 220,
    width: 160,
    border: "1px dotted teal",
    fontSize: 8,
  },
  modalInputsDiv: {
    width: "75%",

    display: "flex",
    flexWrap: "wrap",
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
  const [openModal, setOpenModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [tempImgFile, setTempImgFile] = useState("");
  const [base64File, setBase64File] = useState("");

  useEffect(() => {}, [base64File]);

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
  };

  const postNewBook = () => {
    let post_url =
      "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/InsertNewBook";
    /*
        {
            "title":"test",
            "book_cover_image":"needs to be base64 string",
            "author_uid":"100-000002",
            "genre":"None",
            "num_pages":"10000000000",
            "description":"testing",
            "format":"paper",
            "book_link":"blah"
        }
    */

    let payload = {
      title: post.title,
      book_cover_image: base64File, // TODO
      author_uid: "100-000001", // TODO -> only currently logged in user
      genre: post.genre,
      num_pages: "", // determined dynamically when PDF loads
      description: post.description,
      format: "pdf", // TODO maybe if we allow uploads in other formats
      book_link: "", // TODO
    };

    console.log(payload);
    axios
      .post(post_url, payload)
      .then((res) => {
        console.log(res);
        let arr = [{ message: res.data.message }];
        console.log(arr);
        setStatus(res.status);
        handleOpenSnackbar();
      })
      .catch((err) => {
        console.error(err);
      });
    handleCloseModal();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    setTempImgFile(URL.createObjectURL(file));
    const base64 = await convertBase64(file);
    setBase64File(base64.slice(23));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
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
                  accept="image/jpeg" // TODO: allow png -> currently throws 400 error
                  style={{ display: "none" }}
                />
              </Button>
              {tempImgFile !== "" && (
                <Button
                  size="small"
                  variant="contained"
                  component="label"
                  style={{ marginTop: 5 }}
                  onClick={() => setTempImgFile("")}
                >
                  Remove Cover Image
                </Button>
              )}
            </div>
            <div className={classes.modalInputsDiv}>
              <TextField
                className={classes.modalTextfield}
                id="textfield-title"
                name="title"
                label="Title"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.modalTextfield}
                id="textfield-genre"
                name="genre"
                label="Genre"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.modalTextfield}
                id="textfield-description"
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                onChange={handleChange}
              />
              <Button
                size="small"
                variant="contained"
                onClick={() => postNewBook()}
              >
                Publish
              </Button>
            </div>
          </Paper>
        </Fade>
      </Modal>
      {showSnackbar()}
    </IconContext.Provider>
  );
};
export default AddBook;
