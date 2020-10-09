/* TODO:

  - Books dropdown only loads "checked out" books (no functionality for this atm)
  - Book cover image that loads image from db (needs db schema change)
  - Displays for "checkout", "active", and "reviews" (need queries + schema change)
  - Refactor
  
  Future UI changes (requires db schema change):
    Review form:
        Dropdown for "type" with values hard-coded in, tbd but includes spelling/typos etc.
        Text box for pg# (optional field).
        Text box for Description/Comments
        "+"" button to load another review form, makes container scrollable if > capacity
        Save button that puts review in db

        POST example: 
        https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/InsertNewReview
        {         
          "rev_book_uid":"200-000021",         
          "reader_id":"100-000002",         
          "comments":"testing",         
          "rating_title":"testing",         
          "rating_content":"testing"     
        }
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

// MUI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  outer: {
    display: "flex",
    justifyContent: "space-between",
    //border: "1px solid gray",
    height: "500px",
    width: "auto",
    margin: 15,
    padding: 15,
    backgroundColor: "#e0f2f1",
  },
  dropdownDiv: {
    textAlign: "center",
    alignItems: "center",
    //border: "1px solid gray",
    width: "50%",
    height: "100%",
    marginLeft: "auto",
  },
  imgDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: 300,
    width: 250,
    border: "1px solid gray",
    margin: "0 auto",
    fontSize: 6,
  },
  inputDiv: {
    display: "flex",
    flexWrap: "nowrap",
    height: "100%",
    textAlign: "center",
    width: "50%",
    padding: "15px",
    //border: "1px solid gray",
    marginRight: "auto",
  },
  input: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 4,
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

function ReaderDashboard() {
  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";
  const [result, setResult] = useState([]);
  const [post, setPost] = useState({
    rev_book_uid: "",
    reader_id: "",
    comments: "",
    rating_title: "",
    rating_content: "",
  });
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
    const AllBooksUrl = url + "/api/v2/AllBooks";
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

  const clear = () => {
    setResult([]);
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
    console.log(post);
  };

  const sendPostArgs = (e) => {
    const get_url = url + e.target.value;
    console.log(get_url);
    let payload = {
      rev_book_uid: bookUid,
      reader_id: "100-000002", // TODO: get reader id from login credentials
      comments: post.comments,
      rating_title: post.rating_title,
      rating_content: post.rating_content,
    };
    console.log(payload);
    axios
      .post(get_url, payload)
      .then((res) => {
        console.log(res);
        let arr = [{ message: res.data.message }];
        setResult(arr);
      })
      .catch((err) => {
        console.error(err);
      });
    clear();
  };

  // bool for handling conditional render
  const [bookIsSelected, setBookIsSelected] = useState(false);
  const handleSelect = (e) => {
    const newBookUid = e.target.value;
    console.log(newBookUid);
    setBookUid(newBookUid);
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
      {/* Outer Container */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={styles.outer}
      >
        {/* Left inner div containing dropdown and book cover image */}
        <Grid item style={styles.dropdownDiv}>
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
        </Grid>

        {/* Right inner div containing feedback forms */}
        {bookIsSelected ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={styles.inputDiv}
          >
            <input
              name="comments"
              style={styles.input}
              value={post.comments}
              placeholder="comments"
              onChange={handleChange}
            />

            <input
              name="rating_title"
              style={styles.input}
              value={post.rating_title}
              placeholder="rating_title"
              onChange={handleChange}
            />

            <input
              name="rating_content"
              style={styles.input}
              value={post.rating_content}
              placeholder="rating_content"
              onChange={handleChange}
            />
            <button
              name="submit"
              style={styles.input}
              className="btn btn-primary"
              value="/api/v2/InsertNewReview"
              onClick={sendPostArgs}
            >
              Submit
            </button>
          </Grid>
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

export default ReaderDashboard;
