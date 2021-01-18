/* TODO: 
- table overflows into footer
- author stats on same line
*/

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    width: "100%",
    margin: "auto",
    height: "auto",
    minHeight: "80vh",
  },
  gridDropdown: {
    flex: 1,
  },
  gridTable: {
    flex: 1,
  },

  paper: {
    display: "flex",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: "80%",
  },
  table: {
    minWidth: 650,
  },
  tableColumnHeader: {
    fontWeight: 500,
    fontSize: 14,
  },
  noReviewsDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));

const AuthorReviewBookSelector = (props) => {
  const classes = useStyles();

  const [bookTitle, setBookTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    console.log(props);
  }, [bookTitle]);

  const handleSelect = (e) => {
    setPage(0);
    setRowsPerPage(5);
    setBookTitle(e.target.value);
    console.log("Selected book: ", bookTitle);
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
      .filter((review) => review.title === bookTitle)
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
        <Paper className={classes.paper}>
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
    console.log(rows.length);
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
                  <span style={{ fontStyle: "italic" }}>{bookTitle}</span>
                </TableCell>
                <TableCell align="right" className={classes.tableColumnHeader}>
                  Pg.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 && (
                <TableCell component="th" scope="row">
                  No reviews to display.
                </TableCell>
              )}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => (
                  <TableRow key={rows.index}>
                    <TableCell component="th" scope="row">
                      {rows.review}
                    </TableCell>
                    <TableCell align="right">{rows.pageNum}</TableCell>
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
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>Select a book</InputLabel>
          <Select
            defaultValue={""}
            value={props.books[0]}
            onChange={handleSelect}
          >
            {props.books.map((book, index) => (
              <MenuItem value={book.title} key={index}>
                {book.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Browse reviews</FormHelperText>
        </FormControl>
      </Paper>
    );
  };

  return (
    <Grid container spacing={1} className={classes.gridContainer}>
      <Grid item sm={4} className={classes.gridDropdown}>
        {dropdownMenu(props)}
      </Grid>
      <Grid item sm={6} className={classes.gridTable}>
        {bookTitle === "" ? displayAuthorStats() : reviewTable()}
      </Grid>
    </Grid>
  );
};

export default AuthorReviewBookSelector;
