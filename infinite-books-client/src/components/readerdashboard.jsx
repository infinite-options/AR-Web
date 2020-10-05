import React, { useState } from "react";
import axios from "axios";

const styles = {
  inputDiv: {
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    marginBottom: 150,
    marginTop: 150,
  },
  getRequests: {
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    marginBottom: 150,
    marginTop: 150,
  },
  input: {
    margin: 5,
  },
  text: {
    margin: "auto",
    padding: "2px",
    color: "gray",
  },
};

/* TODO:

UI: Dropdown that loads book titles from database 
    (eventually only loads "checked out" books)
    Book cover image that loads image from db 
    Displays for "checkout", "active", and "reviews" (need queries)
    Review form:
        Dropdown for type with values hard-coded in, tbd but includes spelling/typos etc.
        Text box for pg#, optional field.
        Text box for Description/Comments
        + button to load another review form, makes outer thing scrollable
        Save button that puts review in db

        TODO:
        1. Create boxes on webpage *check* 
        2. Capture information entered into the box and be able to print it at will
        3. Create JSON object to store the information in db
        https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/InsertNewReview
        {         
          "rev_book_uid":"200-000021",         
          "reader_id":"100-000002",         
          "comments":"testing",         
          "rating_title":"testing",         
          "rating_content":"testing"     
        }

        TODO: 

*/

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

  const handleChange = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  const sendPostArgs = (e) => {
    const get_url = url + e.target.value;
    console.log(get_url);
    let payload = {
      rev_book_uid: post.rev_book_uid,
      reader_id: post.reader_id,
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

  return (
    <div>
      {/* <div className="getRequests" style={styles.getRequests}></div> */}
      <div style={styles.inputDiv}>
        <div className="card">
          <div style={styles.text}> 200-000019</div>
          <input
            name="rev_book_uid"
            style={styles.input}
            value={post.rev_book_uid}
            placeholder="rev_book_uid"
            onChange={handleChange}
          />
          <div style={styles.text}>100-000002</div>
          <input
            name="reader_id"
            style={styles.input}
            value={post.reader_id}
            placeholder="reader_id"
            onChange={handleChange}
          />
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
        </div>
      </div>
    </div>
  );
}

export default ReaderDashboard;
