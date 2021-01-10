import axios from "axios";
import React, { useState, useEffect } from "react";
import Emoji from "./Emoji";
import BookCard from "./pages/Books/BookCard";
import { Route, BrowserRouter } from "react-router-dom";
import ReadingPane from "./ReadingPane";
import samplePdf from "./BalancingAct.pdf";

const styles = {
  container: {
    height: "auto",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    //border: "1px solid Crimson",
  },
  hr: {
    marginTop: 10,
    marginBottom: 10,
    background: "#a7dee8",
    height: "1px",
  },
  welcomeMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

function Dashboard(props) {
  const url = "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev";
  const [books, setBooks] = useState([]);

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
    const AllBooksUrl = url + "/api/v2/AuthorForEachBook";
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

  const bookCards = [];
  books.forEach((bookObject) => {
    bookCards.push(
      <BookCard
        key={bookObject["book_uid"]}
        variant={"readable"}
        title={bookObject["title"]}
        author={bookObject["author"]}
        genre={bookObject["genre"]}
        num_pages={bookObject["num_pages"]}
        format={bookObject["format"]}
        book_cover_image={bookObject["book_cover_image"]}
        description={bookObject["description"]}
        book_link={bookObject["book_link"]}
      />
    );
  });

  return (
    <>
      <div style={styles.welcomeMessage}>
        Hello, $Username! <Emoji symbol="👋" label="waving" />
        Here is your library, where the books you've checked out will appear.{" "}
        <Emoji symbol="📚" label="books" />
      </div>
      <hr style={styles.hr} />
      <div style={styles.container}>{bookCards}</div>
    </>
  );
}

export default Dashboard;
