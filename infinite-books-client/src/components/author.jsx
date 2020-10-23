/* TODO: 
  Profile page for authors
  Includes:
    author info (name, "pen name" etc)
    target demographic info -> who I want to read my books

*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import $ from "jquery";

// MUI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

const styles = {
  container: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    //border: "1px solid gray",
    height: "500px",
    width: "auto",
    margin: 15,
    padding: 15,
    backgroundColor: "#e0f2f1",
    borderRadius: 5,
  },
  dropdownDiv: {
    textAlign: "center",
    alignItems: "center",
    //border: "1px solid gray",
    width: "50%",
    height: "100%",
    marginLeft: "auto",
    marginRight: 5,
  },
  imgDiv: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexWrap: "wrap",
    height: 300,
    width: 250,
    border: "1px dashed gray",
    margin: "0 auto",
    fontSize: 8,
    paddingLeft: 50,
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    padding: "2px",
  },
  input: {
    width: "75%",
    margin: 2,
    padding: 5,
    marginLeft: 350,
  },
  text: {
    padding: "2px",
    color: "gray",
  },
  FormControl: {
    padding: 20,
    width: 250,
  },
  InputLabel: {
    padding: 20,
  },
};

function Author() {
  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";

  const [books, setBooks] = useState([]);

  // Dropdown menu stuff.
  const [bookUid, setBookUid] = useState("");

  // Emulates componentDidMount -> loads books from db on component load
  useEffect(
    () => {
      getAllBooks();
    },
    // pass an array as an optional second argument to avoid infinite loop
    []
  );

  const getAllBooks = () => {
    // Fetches books from db
    const AllBooksUrl = url + "/api/v2/BooksByAuthorUID/100-000001";
    console.log(AllBooksUrl);
    axios
      .get(AllBooksUrl)
      .then((res) => {
        console.log(res);
        setBooks(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // parses JSON object into kvp { book_uid: title }
  const dropdownItems = [];
  books.forEach((bookObject) => {
    dropdownItems.push(
      <MenuItem value={bookObject["book_uid"]}>{bookObject["title"]}</MenuItem>
    );
  });

  // bool for handling conditional render
  const [bookIsSelected, setBookIsSelected] = useState(false);
  const handleSelect = (e) => {
    const newBookUid = e.target.value;
    console.log(newBookUid);
    setBookUid(newBookUid);
    $.getJSON(
      "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/ReviewByBookUID/" +
        newBookUid,
      function (data) {
        $("#userdata tr>td").remove();
        $.each(data.result, function (key, entry) {
          var tblRow =
            "<tr>" +
            "<td>" +
            entry.review_uid +
            "</td>" +
            "<td>" +
            entry.comments +
            "</td>" +
            "<td>" +
            entry.rating_title +
            "</td>" +
            "<td>" +
            entry.rating_content +
            "</td>" +
            "</tr>";
          $(tblRow).appendTo("#userdata tbody");
        });
      }
    );
  };

  // tracks state of bookuid to re-render after dropdown selection
  useEffect(() => {
    if (bookUid === "") {
      // Default value, nothing selected or top "select a book" option selected
      setBookIsSelected(false);
      console.log(bookIsSelected);
    } else {
      setBookIsSelected(true);
      console.log(bookIsSelected);
    }
  }, [bookUid]);

  return (
    <div>
      {/* outmost Container */}
      <Grid
        container
        direction="row"
        justify="start"
        alignItems="start"
        style={styles.container}
      >
        {/* Left inner div containing dropdown and book cover image */}
        <Paper elevation={3} style={styles.dropdownDiv}>
          <FormControl style={styles.FormControl}>
            <InputLabel style={styles.InputLabel}>Book title</InputLabel>
            <Select value={bookUid} onChange={handleSelect}>
              <MenuItem value="">
                <em>Select a Book...</em>
              </MenuItem>
              {dropdownItems}
            </Select>
            <FormHelperText>Select a book</FormHelperText>
          </FormControl>

          {bookIsSelected && (
            <div style={styles.imgDiv}>
              {bookUid} -- cover image coming soon
            </div>
          )}
        </Paper>

        {/* Right inner div containing feedback forms */}
        {bookIsSelected ? (
          <Paper elevation={3} style={styles.inputDiv}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              style={styles.inputDiv}
            >
              <center>
                <table id="userdata" border="2">
                  <thead>
                    <th>Reviewer</th>
                    <th>Comment</th>
                    <th>Title Rating</th>
                    <th>Content Rating</th>
                  </thead>
                  <tbody></tbody>
                </table>
              </center>
            </Grid>
          </Paper>
        ) : (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={styles.inputDiv}
          >
            Select a book from the dropdown to begin a review
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Author;
