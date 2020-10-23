/*
TODO: 
Review the position of the modal (popout thing), probably looks 
weird on smaller screens
Show cover image on card and modal
*/

import React from "react";
// mui
import { Paper } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AiFillCloseSquare } from "react-icons/ai";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

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
    height: 500,
    width: 800,
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
    height: 402,
    padding: "auto",
    border: "1px solid lightgrey",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 10,
  },
  modalInfo: {
    width: 500,
    height: 480,
    padding: "auto",
    textAlign: "center",
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
};

function BookCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                <h1>{props.title}</h1>
                <p>Author: {props.author}</p>
                {props.genre && <p>Genre: {props.genre}</p>}
                {props.num_pages && <p>Number of pages: {props.num_pages}</p>}
                {props.format && <p>Format: {props.format}</p>}
                {props.description && <p>{props.description}</p>}
                <Link to={props.link}>
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    Check Out
                  </Button>
                </Link>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
export default BookCard;
