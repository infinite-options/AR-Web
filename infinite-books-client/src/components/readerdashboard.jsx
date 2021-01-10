import React, { useState, useEffect } from "react";
import axios from "axios";
import samplePdf from "./BalancingAct.pdf";
import PDFViewer from "./PDFViewer";

// MUI
import MenuItem from "@material-ui/core/MenuItem";

const styles = {
  outer: {
    display: "flex",
    textAlign: "center",
    width: "55%",
    margin: "0 auto",
  },
  inputDiv: {
    padding: "10px",
    margin: "10px",
  },
};

function ReaderDashboard(props) {
  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";
  //const [result, setResult] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookUid, setBookUid] = useState("200-000001"); // TODO: remove default
  const [post, setPost] = useState({
    rev_book_uid: "",
    reader_id: "",
    comments: "",
    rating_title: "",
    rating_content: "",
    page_num: "",
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

  const [pageNum, setPageNum] = useState(1);
  const pageNumCallback = (pageNumber) => {
    setPageNum(pageNumber);
  };

  const sendPostArgs = (e) => {
    e.preventDefault();
    const get_url = url + e.target.value;
    console.log(get_url);
    let payload = {
      /*
        {
          "rev_book_uid":"200-000020",
          "reader_id":"100-000018",
          "comments":"test",
          "rating_title":"test",
          "rating_content":"test"
          "page_num":"10"
      }
      */
      rev_book_uid: bookUid,
      reader_id: "100-000002", // TODO: get reader id from login credentials
      comments: post.comments,
      rating_title: post.rating_title,
      rating_content: post.rating_content,
      page_num: JSON.stringify(pageNum),
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
  const [bookCoverUrl, setBookCoverUrl] = useState();
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
      <div style={styles.outer}>
        <div style={styles.inputDiv}>
          <form>
            <label>Feedback</label>
            <textarea
              name="comments"
              value={post.comments}
              rows={30}
              cols={25}
              onChange={handleChange}
            />
            <button
              name="submit"
              value="/api/v2/InsertNewReview"
              onClick={sendPostArgs}
            >
              Submit
            </button>
          </form>
        </div>
        <PDFViewer pdf={samplePdf} pgNumCallback={pageNumCallback} />
      </div>
    </>
  );
}

export default ReaderDashboard;
