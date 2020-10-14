import React from "react";
import "./FeaturedBook.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

/*
FeaturedBook section: a customizable "page" of fixed-height
 content with small topLine, book title, author name, description,
 & image. Example call:   <FeaturedBook {...bookObjOne} /> 
 where bookObjOne is an object in FeaturedBookData.jsx containing 
 keys and values corresponding to FeaturedBook()'s paramters and 
 what you want them to be. Change the true/false values for the 
 lightBg etc. properties to mix it up.
*/

function FeaturedBook({
  lightBg,
  lightText,
  lightTextDesc,
  topLine,
  title,
  author,
  description,
  buttonLabel,
  img,
  imgStart,
  alt,
}) {
  return (
    <>
      <div
        className={
          lightBg ? "home__featured-book" : "home__featured-book darkBg"
        }
      >
        <div className="container">
          <div
            className="row home__book-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__book-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "title" : "title dark"}>{title}</h1>
                <h3 className={lightText ? "author" : "author dark"}>
                  By {author}
                </h3>
                <p
                  className={
                    lightTextDesc
                      ? "home__book-description"
                      : "home__book-description dark"
                  }
                >
                  {description}
                </p>
                {/* TODO: link to this book or login page */}
                <Link to="/sign-up">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__book-img-wrapper">
                <img src={img} alt={alt} className="home__book-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedBook;
