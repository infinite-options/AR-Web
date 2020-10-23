import axios from "axios";
import React, { useState, useEffect } from "react";
import FeaturedBook from "./FeaturedBook";
import { bookObjOne } from "./FeaturedBookData";
import BookCard from "./BookCard";

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
};

function Books(props) {
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

  // parses JSON object into kvp { book_uid: title }
  const bookCards = [];
  books.forEach((bookObject) => {
    bookCards.push(
      <BookCard
        title={bookObject["title"]}
        author={bookObject["author"]}
        genre={bookObject["genre"]}
        // TODO: add description column to books table and put it here
        num_pages={bookObject["num_pages"]}
        format={bookObject["format"]}
        book_cover_image={bookObject["book_cover_image"]}
        description={bookObject["description"]}
        link={bookObject["link"]}
      />
    );
  });

  return (
    <>
      <FeaturedBook {...bookObjOne} />
      <hr style={styles.hr} />
      <div style={styles.container}>{bookCards}</div>
    </>
  );
}

export default Books;
