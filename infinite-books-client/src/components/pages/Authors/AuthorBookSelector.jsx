/* FIXME: 
 - long reviews should overflow in table cell, or click to show in modal
 - fix dropdown, I borked it
 - editing book cover and pdf does not work

   TODO:
- Style for title, genre and discription could use some polish
- Re-render after adding a new book, editing a book, or deleting a book
- File is kinda big, consider making the table its own component
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Tooltip, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

// Icons
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    width: "100%",
    margin: "auto",
    height: "auto",
    minHeight: "80vh",
  },
  gridDropdown: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  gridTable: {
    marginLeft: "16px",
  },

  paper: {
    display: "inline-block",
    verticalAlign: "top",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperStats: {
    display: "inline-block",
    verticalAlign: "top",
    lineHeight: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bookDisplay: {
    height: "auto",
    color: "#000",
  },
  editTextfield: {
    width: "85%",
  },
  editButton: {
    display: "inline-block",
    color: "#309aac",
    border: "1px solid #309aac",
    cursor: "pointer",
    boxShadow: "3px 2px 2px",
    marginBottom: "15px",
  },
  deleteButton: {
    display: "inline-block",
    color: "#e57373",
    border: "1px solid #e57373",
    cursor: "pointer",
    boxShadow: "3px 2px 2px",
    marginBottom: "15px",
    marginLeft: 6,
  },
  uploadImageButton: {
    width: "88%",
    marginTop: 4,
    padding: 6,
    backgroundColor: "#309aac",
    color: "#fff",
  },
  imageAndTitleContainer: {
    display: "flex",
    flexGrow: 1,
  },
  titleAndGenreContainer: {
    height: "100%",
    width: "100%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexFlow: "column",
  },
  imageDiv: {
    height: 240,
    width: 160,
  },
  noImageDiv: {
    justifyContent: "space-between",
    fontStyle: "italic",
    textAlign: "center",
    height: 240,
    width: 160,
    border: "1px dotted teal",
    fontSize: 8,
  },
  bookDisplayTypography: {
    border: "1px solid lightgray",
    height: "100%",
    flexGrow: 1,
    padding: 25,
    margin: 10,
    marginLeft: 20,
  },
  bookDisplayHeader: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  formControl: {
    width: "80%",
  },
  table: {
    minWidth: 650,
  },
  tableTextContainer: {
    fontSize: 14,
    texOverflow: "ellipsis",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  tableColumnHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  editButtonGroup: {
    padding: 15,
  },
}));

const AuthorBookSelector = (props) => {
  const classes = useStyles();

  const [selectedBook, setSelectedBook] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {}, [selectedBook, props]);

  const handleSelect = (e) => {
    /*
    image : e.target.value.book_cover_image
    pdf: e.target.value.book_link
    */
    console.log(e.target.value);
    setEditMode(false);
    setPage(0);
    setRowsPerPage(5);
    setTempImgFile("");
    setPdfFilename("");
    //setImgFile(new File(e.target.value.book_link, e.target.value.book_link));
    //console.log(imgFile);
    setSelectedBook(e.target.value);
    setBookIsSelected(true);
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  function createData(review, pageNum) {
    return { review, pageNum };
  }

  const generateTableRows = () => {
    let row = props.reviews
      .flat()
      .filter((review) => review.title === selectedBook.title)
      .map((review) =>
        review.page_num === null
          ? createData(review.comments, "")
          : createData(review.comments, review.page_num)
      );
    return row;
  };

  const displayAuthorStats = () => {
    return (
      <>
        <Paper className={classes.paperStats}>
          {!props.stats.numBooks ? (
            <Typography>No books yet. </Typography>
          ) : (
            <div>
              <Typography variant="h5">
                Number of books: {props.stats.numBooks}
              </Typography>
            </div>
          )}
          {!props.stats.numReviews ? (
            ""
          ) : (
            <div>
              <Typography variant="h5">
                Number of reviews: {props.stats.numReviews}
              </Typography>
            </div>
          )}
        </Paper>
      </>
    );
  };

  const reviewTable = (props) => {
    let rows = generateTableRows();
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableColumnHeader}>
                  Reviews for{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {selectedBook.title}
                  </span>
                </TableCell>
                <TableCell align="right" className={classes.tableColumnHeader}>
                  Pg.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 && (
                <TableCell component="th" scope="row">
                  <div className={classes.tableTextContainer}>
                    No reviews to display.
                  </div>
                </TableCell>
              )}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => (
                  <TableRow key={rows.index}>
                    <TableCell component="th" scope="row">
                      <div className={classes.tableTextContainer}>
                        {rows.review}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className={classes.tableTextContainer}>
                        {rows.pageNum}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    );
  };

  const dropdownMenu = (props) => {
    return (
      <FormControl className={classes.formControl}>
        <span style={{ fontWeight: "bold", marginBottom: 5 }}>My books</span>
        <InputLabel className={classes.inputLabel}>Select a book</InputLabel>
        <Select value={props.books[0]} onChange={handleSelect}>
          <MenuItem value={""}>
            <Typography>Select a book</Typography>
          </MenuItem>
          {props.books.map((book, index) => (
            <MenuItem value={book} key={index}>
              {book.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Browse reviews</FormHelperText>
      </FormControl>
    );
  };

  const [editMode, setEditMode] = useState(false);
  const [bookIsSelected, setBookIsSelected] = useState(false);
  const [error, setError] = React.useState("");
  const [post, setPost] = useState({
    title: selectedBook.title,
    genre: selectedBook.genre,
    description: selectedBook.description,
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
    // setImgFile({ obj: undefined, url: "" });
    // setPdfFile({ obj: undefined, url: "" });
    // setTempImgFile("");
    // setPdfFilename("");
    setError("");
  };

  const [tempImgFile, setTempImgFile] = useState("");
  const [pdfFilename, setPdfFilename] = useState("");
  const [imgFile, setImgFile] = useState({ obj: undefined, url: "" });
  const [pdfFile, setPdfFile] = useState({ obj: undefined, url: "" });

  useEffect(() => {}, [imgFile, pdfFile, tempImgFile]);

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setTempImgFile(URL.createObjectURL(file));
      setImgFile({ obj: file, url: URL.createObjectURL(file) });
    } else if (file.type === "application/pdf") {
      setPdfFile({ obj: file, url: URL.createObjectURL(file) });
      setPdfFilename(file.name);
    } else {
      console.error(file.type, ": this file type is not supported.");
    }
  };

  const [status, setStatus] = React.useState("");
  const [alertReason, setAlertReason] = React.useState("");

  const handleEditSubmit = () => {
    const update_url = process.env.REACT_APP_SERVER_BASE_URI + "UpdateBook";

    let bookToUpdate = {
      book_uid: selectedBook.book_uid,
      data: {
        title: post.title,
        genre: post.genre,
        description: post.description,
        book_cover_image: imgFile.obj,
        book_pdf: pdfFile.obj,
      },
    };

    if (verifyBookInfo(bookToUpdate)) {
      let formData = new FormData();
      Object.entries(bookToUpdate).forEach((entry) => {
        formData.append(entry[0], entry[1]);
      });
      axios
        .post(formData, bookToUpdate)
        .then((res) => {
          console.log(res);
          let arr = [{ message: res.data.message }];
          console.log(arr);
          setStatus(res.status);
          setAlertReason("Edited");
        })
        .catch((err) => {
          console.error(err);
        });
      handleOpenSnackbar();
      handleEdit();
      clear();
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setTempImgFile("");
    setPdfFilename("");
  };

  const [openDialogue, setOpenDialogue] = React.useState(false);

  const handleDialogueOpen = () => {
    setOpenDialogue(true);
  };

  const handleDialogueClose = () => {
    setOpenDialogue(false);
  };

  const handleDelete = () => {
    const delete_url = process.env.REACT_APP_SERVER_BASE_URI + "DeleteBook";
    let bookToDelete = {
      book_uid: selectedBook.book_uid,
    };

    axios
      .post(delete_url, bookToDelete)
      .then((res) => {
        console.log(res);
        let arr = [{ message: res.data.message }];
        console.log(arr);
        setStatus(res.status);
        setAlertReason("Deleted");
      })
      .catch((err) => {
        console.error(err);
      });
    handleOpenSnackbar();
    handleDialogueClose();
  };

  const verifyBookInfo = (bookInfo) => {
    let goodToGo = true;
    if (bookInfo.data.title === "") {
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

  const imageDisplay = () => {
    if (selectedBook.book_cover_image !== "") {
      return (
        <>
          <div className={classes.imageDiv}>
            {tempImgFile !== "" ? (
              <img
                src={tempImgFile}
                alt=""
                style={{ height: "220px", width: "160px" }}
              />
            ) : (
              <img
                src={selectedBook.book_cover_image}
                alt=""
                style={{ height: "220px", width: "160px" }}
              />
            )}

            {editMode && (
              <Button
                color="primary"
                size="small"
                variant="contained"
                component="label"
                style={{ marginTop: 1 }}
              >
                <Typography>Change cover image</Typography>
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="uploadedPhoto"
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                />
              </Button>
            )}
          </div>
        </>
      );
    } else {
      if (tempImgFile !== "") {
        return (
          <>
            <div className={classes.imageDiv}>
              <img
                src={tempImgFile}
                alt=""
                style={{ height: "220px", width: "160px" }}
              />
              {editMode && (
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  component="label"
                  style={{ marginTop: 5 }}
                >
                  <Typography>Change cover image</Typography>
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    id="uploadedPhoto"
                    accept="image/jpeg, image/png"
                    style={{ display: "none" }}
                  />
                </Button>
              )}
            </div>
          </>
        );
      } else {
        return (
          <div className={classes.noImageDiv}>
            <Typography variant="subtitle2">
              No book cover to display.
            </Typography>
            {editMode && (
              <Button
                color="primary"
                size="small"
                variant="contained"
                component="label"
                style={{ marginTop: 5 }}
              >
                <Typography size="large" variant="body2">
                  Add cover image
                </Typography>
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="uploadedPhoto"
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                />
              </Button>
            )}
          </div>
        );
      }
    }
  };

  const bookDisplay = () => {
    if (bookIsSelected) {
      return (
        <>
          <Tooltip title="Click to edit" placement="right">
            <div
              className={classes.editButton}
              onClick={editMode ? () => handleEditCancel() : () => handleEdit()}
            >
              <AiFillEdit size={24} />
            </div>
          </Tooltip>
          <div className={classes.deleteButton} onClick={handleDialogueOpen}>
            <AiFillDelete size={24} />
          </div>
          <div className={classes.bookDisplayContainer}>
            <div className={classes.imageAndTitleContainer}>
              {imageDisplay()}
              <div className={classes.bookDisplayTypography}>
                <Typography className={classes.bookDisplayHeader} variant="h6">
                  Title
                </Typography>
                {editMode ? (
                  <TextField
                    className={classes.editTextfield}
                    id="textfield-title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    size="small"
                    defaultValue={selectedBook.title}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography variant="body1">{selectedBook.title}</Typography>
                )}
              </div>
            </div>

            <div className={classes.titleAndGenreContainer}>
              <div className={classes.bookDisplayTypography}>
                <Typography className={classes.bookDisplayHeader} variant="h6">
                  Genre
                </Typography>
                {editMode ? (
                  <TextField
                    className={classes.editTextfield}
                    id="textfield-genre"
                    name="genre"
                    label="Genre"
                    variant="outlined"
                    size="small"
                    defaultValue={selectedBook.genre}
                    onChange={handleChange}
                  />
                ) : (
                  <div>
                    {selectedBook.genre === "" ? (
                      <Typography
                        variant="body1"
                        style={{
                          fontStyle: "italic",
                          color: "lightslategray",
                        }}
                      >
                        Nothing to display. Click the edit button to add
                        something.
                      </Typography>
                    ) : (
                      <Typography variant="body1">
                        {selectedBook.genre}
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={classes.bookDisplayTypography}>
            <Typography className={classes.bookDisplayHeader} variant="h6">
              Description
            </Typography>
            {editMode ? (
              <TextField
                className={classes.editTextfield}
                id="textfield-description"
                name="description"
                label="Description"
                variant="outlined"
                size="small"
                defaultValue={selectedBook.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            ) : (
              <div>
                {selectedBook.description === "" ? (
                  <Typography
                    variant="body1"
                    style={{ fontStyle: "italic", color: "lightslategray" }}
                  >
                    Nothing to display. Click the edit button to add something.
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    {selectedBook.description}
                  </Typography>
                )}
              </div>
            )}
            {editMode && (
              <span>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  component="label"
                  style={{ marginTop: 20 }}
                >
                  Change book PDF
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
              </span>
            )}
            {editMode && (
              <div className={classes.editButtonGroup}>
                {showErrors()}
                <ButtonGroup variant="contained">
                  <Button color="primary" onClick={handleEditSubmit}>
                    Save Changes
                  </Button>
                  <Button color="secondary" onClick={() => handleEditCancel()}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </div>
        </>
      );
    }
  };

  const showAlert = () => {
    return (
      <div>
        <Dialog
          open={openDialogue}
          onClose={handleDialogueClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to permanently delete{" "}
              <span style={{ fontStyle: "italic" }}>{selectedBook.title}</span>.
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogueClose} color="secondary">
              Nevermind
            </Button>
            <Button onClick={handleDelete} color="primary">
              Do it
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const noBooksToDisplay = () => {
    return (
      <Typography variant={"subtitle2"}>
        You don't currently have any books published. When you're ready, publish
        a new book and you'll see your stats and reviews here.
      </Typography>
    );
  };

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
              {post.title} {alertReason} successfully!
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
    <Grid container spacing={1} className={classes.gridContainer}>
      <Grid item md={5} className={classes.gridDropdown}>
        <Paper className={classes.paper}>
          {props.books.length === 0 ? (
            noBooksToDisplay()
          ) : (
            <div>
              <div style={{ padding: 15 }}>{dropdownMenu(props)}</div>
              <div className={classes.bookDisplay}>{bookDisplay()}</div>
            </div>
          )}
        </Paper>
      </Grid>

      <Grid item md={6} className={classes.gridTable}>
        {/* If no book is selected, display author stats */}
        {Object.keys(selectedBook).length === 0
          ? displayAuthorStats()
          : reviewTable()}
      </Grid>
      {showAlert()}
      {showSnackbar()}
    </Grid>
  );
};

export default AuthorBookSelector;
