import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import Emoji from "../../Emoji";
import BookCard from "../Books/BookCard";
import Cookies from "universal-cookie";

// MUI
import { Typography } from "@material-ui/core";

/*
  TODO: get user_uid by Auth rather than cookies
*/

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
  welcomeMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

function Dashboard(props) {
  let uid = cookies.get("user_uid") === null ? "" : cookies.get("user_uid");
  const Auth = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const [changeTriggered, setChangeTriggered] = useState(false);
  useEffect(() => {
    getCheckedOutBooks();
    //getReviewedBooks();
  }, [changeTriggered]);

  const handleTriggerChange = () => {
    setChangeTriggered(!changeTriggered);
  };

  const [getBookStatus, setGetBookStatus] = useState("");

  const getCheckedOutBooks = () => {
    const checkedOutBooksUrl =
      process.env.REACT_APP_SERVER_BASE_URI + "BooksCheckedOut";
    const payload = {
      user_uid: uid,
    };
    setGetBookStatus("Retrieving your books...");
    axios
      .post(checkedOutBooksUrl, payload)
      .then((res) => {
        // console.log(res.data.result);
        let uniqueBooks = getUniqueListBy(res.data.result, "book_uid");
        console.log(uniqueBooks);
        setBooks(uniqueBooks);
        setGetBookStatus(
          "You don't have any books checked out. Head over to the Books tab to check something out."
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const getReviewedBooks = () => {
  //   const reviewedBooksUrl =
  //     process.env.REACT_APP_SERVER_BASE_URI + "ReviewBySingleUser/";
  //   const payload = {
  //     reader_id: uid,
  //   };
  //   axios
  //     .post(reviewedBooksUrl, payload)
  //     .then((res) => {
  //       console.log(res.data.result);
  //       let uniqueBooks = getUniqueListBy(res.data.result, "book_uid");
  //       console.log(uniqueBooks);
  //       setBooks(uniqueBooks);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  const bookCards = () => {
    let bookCardsArray = [];
    books.forEach((bookObject, index) => {
      //console.log(bookObject);
      bookCardsArray.push(
        <BookCard
          key={index}
          book_uid={bookObject["book_uid"]}
          variant={"readable"}
          title={bookObject["title"]}
          author={bookObject["author"]}
          genre={bookObject["genre"]}
          num_pages={bookObject["num_pages"]}
          format={bookObject["format"]}
          book_cover_image={bookObject["book_cover_image"]}
          description={bookObject["description"]}
          book_link={bookObject["book_link"]}
          book_is_checked_out={
            bookObject["status"] === "CHECKED OUT" ? true : false
          }
        />
      );
    });
    if (bookCardsArray.length > 0) {
      return bookCardsArray;
    } else {
      return <Typography>{getBookStatus}</Typography>;
    }
  };

  return (
    <>
      <div style={styles.welcomeMessage}>
        Hello, {Auth.username}! <Emoji symbol="👋" label="waving" />
        Here is your library, where the books you've checked out will appear.{" "}
        <Emoji symbol="📚" label="books" />
      </div>
      <hr style={styles.hr} />
      <div style={styles.container}>{bookCards()}</div>
    </>
  );
}

export default Dashboard;
