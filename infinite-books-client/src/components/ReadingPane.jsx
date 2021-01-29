import React, { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "./PDFViewer";
import { Redirect } from "react-router";
// import samplePdf from "./BalancingAct.pdf";

const styles = {
  outer: {
    display: "flex",
    textAlign: "center",
    width: "55%",
    height: "auto",
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

  const [post, setPost] = useState({
    rev_book_uid: "",
    reader_id: "",
    comments: "",
    rating_title: "",
    rating_content: "",
    page_num: "",
  });

  const clear = () => {
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
      rev_book_uid: props.location.book_uid,
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

  useEffect(() => {
    console.log(props);
    window.scrollTo(0, 0);
  }, [props]);

  return (
    <>
      {props.location.pdf === undefined ? (
        <Redirect to="/readers" />
      ) : (
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
          <PDFViewer pdf={props.location.pdf} pgNumCallback={pageNumCallback} />
        </div>
      )}
    </>
  );
}

export default ReaderDashboard;
