import React from "react";
import "./HeroSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

/*
Hero section: a customizable "page" of fixed-height
 content with small topLine, headline, description,
 & image. Example call:   <HeroSection {...homeObjOne} /> 
 where homeObjOne is an object containing keys and values
 corresponding to HeroSection()'s paramters and what you
 want them to be.
*/

function HeroSection({
  lightBg,
  lightText,
  lightTextDesc,
  topLine,
  headline,
  description,
  buttonLabel,
  img,
  imgStart,
  alt,
}) {
  return (
    <>
      <div
        className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}
      >
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? "home__hero-subtitle"
                      : "home__hero-subtitle dark"
                  }
                >
                  {description}
                </p>
                <Link to="/sign-up">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt={alt} className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
