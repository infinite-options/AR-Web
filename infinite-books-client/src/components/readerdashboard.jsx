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
        Subcomponent-ize the review forms
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
import ReaderProfile from "./ReaderProfile";

// MUI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";

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
    width: 185,
    border: "1px solid lightgray",
    margin: "0 auto",
    fontSize: 8,
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    width: "50%",
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

function ReaderDashboard(props) {
  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";
  //const [result, setResult] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookUid, setBookUid] = useState("");
  const [post, setPost] = useState({
    rev_book_uid: "",
    reader_id: "",
    comments: "",
    rating_title: "",
    rating_content: "",
  });

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
      <MenuItem
        value={bookObject["book_cover_image"]}
        key={bookObject["book_uid"]}
      >
        {bookObject["title"]}
      </MenuItem>
    );
  });

  const clear = () => {
    //setResult([]);
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
        //let arr = [{ message: res.data.message }];
        //setResult(arr);
      })
      .catch((err) => {
        console.error(err);
      });
    clear();
  };

  // bool for handling conditional render
  const [bookIsSelected, setBookIsSelected] = useState(false);
  const [bookCoverUrl, setBookCoverUrl] = useState(false);
  const handleSelect = (e) => {
    const newBookUid = e.target.key;
    const newBookCoverUrl = e.target.value;
    setBookUid(newBookUid);
    setBookCoverUrl(newBookCoverUrl);
  };

  // tracks state of bookuid to re-render after dropdown selection
  useEffect(() => {
    if (bookUid === "") {
      // Default value, nothing selected or top "select a book" option selected
      setBookIsSelected(false);
    } else {
      setBookIsSelected(true);
    }
  }, [bookUid]);

  return (
    <>
      {/* <ReaderProfile /> */}
      <div>
        {/* outmost container */}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
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
                <img
                  src={bookCoverUrl}
                  style={{ height: 300 }}
                  alt="Cover coming soon"
                />
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
                <input
                  name="comments"
                  value={post.comments}
                  rows={4}
                  style={styles.input}
                  placeholder="comments"
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
    </>
  );
}

export default ReaderDashboard;
