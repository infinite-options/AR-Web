// TODO: change booksUrl to only retrieve books by the logged in author

import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorBookSelector from "./AuthorBookSelector";
import AddBook from "./AddBook";
// Getting user UID from cookies, maybe should get it from AuthContext?
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AuthorDashboard = () => {
  useEffect(() => {
    getBooksByAuthorUID();
  }, []);

  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

  const [books, setBooks] = useState([]);

  const [authorStats, setAuthorStats] = useState({
    numBooks: null,
    numReviews: null,
  });

  // Reviews array is an array of arrays of objects
  // Inner arrays group reviews by book UID
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    accumulateAuthorStats(books, reviews);
  }, [books, reviews]);

  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";

  const getBooksByAuthorUID = () => {
    const booksUrl = url + "/api/v2/BooksByAuthorUID/" + uid;
    const reviewByBookUidUrl = url + "/api/v2/ReviewByBookUID/";
    console.log(booksUrl);
    // Gets books by author UID
    axios
      .get(booksUrl)
      .then((res) => {
        console.log(res.data.result);
        setBooks(res.data.result);
        let bookUidArray = [];
        // Maps each bookUid to a URL in order to generate more get requests
        res.data.result.map((bookObject) => {
          bookUidArray.push(reviewByBookUidUrl + bookObject.book_uid);
        });
        //console.log("Making requests to: ", bookUidArray);
        // Gets all reviews for each book the author has written
        return axios.all(
          bookUidArray.map((requestUrl) => axios.get(requestUrl))
        );
      })
      .then((res) => {
        //console.log(res);
        let reviewObjectsArray = [];
        res.map((promiseObject) => {
          reviewObjectsArray.push(promiseObject.data.result);
        });
        setReviews(reviewObjectsArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Counts the number of books, and total number of reviews for all books by author
  const accumulateAuthorStats = (books, reviews) => {
    //console.log(reviews);
    const numberOfBooks = books.length;
    const numberOfReviews = reviews
      .flat()
      .reduce((total, review) => total + 1, 0);
    setAuthorStats({ numBooks: numberOfBooks, numReviews: numberOfReviews });
  };

  return (
    <Grid container>
      <AddBook />
      <AuthorBookSelector books={books} reviews={reviews} stats={authorStats} />
    </Grid>
  );
};

export default AuthorDashboard;
