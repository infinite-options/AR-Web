import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";

/*
Footer is called by App.js
Commented code is unimplemented stuff, like mailing lists and other links.
Social media links 
*/

function Footer() {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our mailing list to get notified about new and trending books.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact</h2>
            <Link to="/">Support</Link>
            <Link to="/">Marketing</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Follow</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div> */}
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <GiSpellBook className="navbar-icon" />
              Infinite Books
            </Link>
          </div>
          <Link
            className="social-icon-link"
            to={{
              pathname: "https://www.infiniteoptions.com/",
            }}
            target="_blank"
            aria-label="LinkedIn"
          >
            <small className="website-rights">Infinite Options © 2020</small>
          </Link>
          <div className="social-icons">
            <Link
              className="social-icon-link"
              to={{
                pathname:
                  "https://www.youtube.com/channel/UCxTyIQ2n4euFZH-rSWzYa7A",
              }}
              target="_blank"
              aria-label="Youtube"
            >
              <FaYoutube />
            </Link>
            <Link
              className="social-icon-link"
              to={{
                pathname:
                  "https://www.linkedin.com/company/infinite-options-llc/",
              }}
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </Link>
            {/* <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </Link> */}
            {/* <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link> */}
            {/* <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
