import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FeaturedBook from "./FeaturedBook";
import { bookObjOne } from "./FeaturedBookData";
import BookCard from "./BookCard";

const cookies = new Cookies();

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
  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");

  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
    getCheckedOutBooks();
  }, []);
  useEffect(() => {
    console.log(checkedOutBooks);
  }, [books, checkedOutBooks]);

  const getAllBooks = () => {
    const allBooksUrl =
      process.env.REACT_APP_SERVER_BASE_URI + "AuthorForEachBook";
    axios
      .get(allBooksUrl)
      .then((res) => {
        console.log(res);
        setBooks(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCheckedOutBooks = () => {
    const checkedOutBooksUrl =
      process.env.REACT_APP_SERVER_BASE_URI + "BooksCheckedOut";
    const payload = {
      user_uid: uid,
    };
    axios
      .post(checkedOutBooksUrl, payload)
      .then((res) => {
        console.log(res.data.result);
        let checkedOutBooksTemp = [];
        res.data.result.map((book) => checkedOutBooksTemp.push(book.book_uid));
        setCheckedOutBooks(checkedOutBooksTemp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const bookCards = books.map((bookObject, index) => {
    return (
      <BookCard
        key={index}
        variant={"preview"}
        book_uid={bookObject["book_uid"]}
        title={bookObject["title"]}
        author={bookObject["author"]}
        genre={bookObject["genre"]}
        num_pages={bookObject["num_pages"]}
        format={bookObject["format"]}
        book_cover_image={bookObject["book_cover_image"]}
        description={bookObject["description"]}
        book_link={bookObject["book_link"]}
        book_is_checked_out={checkedOutBooks.some(
          (book) => book === bookObject["book_uid"]
        )}
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
