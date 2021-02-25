/*
BookCard: called by Books and AuthorDashboard. 
prop variant determines type of book card, 
variant="preview" adds a "check out" button while
variant="readable" adds "start reading" button 
(assumes book is checked out already)
TODO: 
- Implement book return 
- Test the position of the modal, probably looks weird on smaller screens
- Implement check out
- better styles/formatting for the modal (title, author, etc)
*/

import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// mui
import { Paper, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AiFillCloseSquare } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const cookies = new Cookies();

const styles = {
  cardContainer: {
    height: 340,
    width: 180,
    margin: 12,
    padding: 10,
    backgroundColor: "#e0f2f1",
    cursor: "pointer",
  },
  imgDiv: {
    display: "flex",
    width: "auto",
    border: "1px solid lightgrey",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",

    fontSize: 8,
  },
  infoDiv: {
    height: "30%",
    boxShadow: "1px 1px 1px grey",
    marginTop: 3,
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fafafa",
  },
  title: {
    width: "100%",
    fontFamily: "Roboto Slab, serif",
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontFamily: "Roboto Slab, serif",
    fontSize: 12,
  },
  modalContainer: {
    //height: "50vh",
    //width: "90vh",
    height: 480,
    width: 820,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "auto",
    marginTop: 100,
    padding: 10,
    position: "relative",
    //marginTop: "25vh",
  },
  modalImg: {
    width: 300,
    height: 400,
    border: "1px solid lightgrey",
    marginLeft: 10,
    marginTop: 4,
  },
  modalInfo: {
    display: "table",
    textAlign: "center",
    width: 500,
    height: 480,
    padding: "auto",
    alignItems: "center",
    alignContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#31555c",
    cursor: "pointer",
  },
  muiButton: {
    display: "table-cell",
    verticalAlign: "bottom",
  },
  modalText: {
    padding: 10,
  },
};

function BookCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  Checkout TODO:
  get all books checked out by user
  if book not checked out by user, check out button -> InsertNewReview
  else, button says "in library" or something, onClick links to Readers
  */
  const handleCheckout = () => {
    const post_url = process.env.REACT_APP_SERVER_BASE_URI + "InsertNewReview";
    let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

    let payload = {
      rev_book_uid: props.book_uid,
      reader_id: uid,
    };

    console.log(payload);
    axios
      .post(post_url, payload)
      .then((res) => {
        console.log(res);
        let arr = [{ message: res.data.message }];
        console.log(arr);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let button;
  if (props.variant === "preview") {
    if (props.book_is_checked_out) {
      button = (
        <Button
          disabled
          style={styles.muiButton}
          variant="contained"
          color="secondary"
        >
          In Library
        </Button>
      );
    } else {
      button = (
        <Button
          style={styles.muiButton}
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Check Out
        </Button>
      );
    }
  } else if (props.variant === "readable") {
    button = (
      <>
        <Link
          to={{
            pathname: "/readingpane",
            pdf: props.book_link,
            book_uid: props.book_uid,
          }}
        >
          <Button style={styles.muiButton} variant="contained" color="primary">
            Start Reading
          </Button>
        </Link>
      </>
    );
  } else {
    // should probably never enter this case
    button = (
      <Button
        buttonSize="btn--wide"
        buttonColor="blue"
        onClick={handleCheckout}
      >
        Check Out
      </Button>
    );
  }

  return (
    <React.Fragment>
      <Paper elevation={2} style={styles.cardContainer} onClick={handleOpen}>
        <div style={styles.imgDiv}>
          <img
            src={props.book_cover_image}
            alt="Cover coming soon"
            style={{ height: "220px", width: "160px" }}
          />
        </div>
        <div style={styles.infoDiv}>
          <p style={styles.title}>{props.title}</p>
          <p style={styles.author}>{props.author}</p>
        </div>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} style={styles.modalContainer}>
            <div className="row">
              <AiFillCloseSquare
                style={styles.closeIcon}
                size={32}
                onClick={handleClose}
              />
              <div style={styles.modalImg}>
                <img
                  src={props.book_cover_image}
                  width="300"
                  alt="Cover coming soon"
                />
              </div>
              <div style={styles.modalInfo}>
                <Typography variant="h3" style={styles.modalText}>
                  {props.title}
                </Typography>
                <Typography variant="h5" style={styles.modalText}>
                  Author: {props.author}
                </Typography>
                {props.genre && (
                  <Typography variant="subtitle2" style={styles.modalText}>
                    Genre: {props.genre}
                  </Typography>
                )}
                {/* {props.num_pages && <p>Number of pages: {props.num_pages}</p>} */}
                {/* {props.format && <p>Format: {props.format}</p>} */}
                {props.description && (
                  <Typography variant="body1" style={styles.modalText}>
                    Description: {props.description}
                  </Typography>
                )}
                {button}
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
export default BookCard;
