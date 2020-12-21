import React from "react";
import { Link } from "react-router-dom";

const LOGO = require("../assets/logo.png").default;
const FOOTER = require("../assets/footer.png").default;
const EMAIL_ICON = require("../assets/email.png").default;
const PHONE_ICON = require("../assets/phone.png").default;
const FACEBOOK_ICON = require("../assets/fb.png").default;
const GOOGLE_ICON = require("../assets/google.png").default;
const TWITTER_ICON = require("../assets/twitter.png").default;

export const Header = ({ authorized, handleLogout }) => {
  return (
    <header>
      <img className="header-logo" src={LOGO} alt="logo" />
      <nav>
        <ul className="left-menu">
          <li>
            <Link to="/">Countries</Link>
          </li>
          <li>
            <Link to="/find">Find</Link>
          </li>
          <li>
            <Link to="/distance">Distance Calculator</Link>
          </li>
        </ul>
        <ul className="right-menu">
          {authorized ? (
            <>
              <li>
                <Link to="/login">Profile</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer>
      <div className="first">
        <img className="footer-photo" src={FOOTER} alt="footer" />
        <div className="icons">
          <a href="#facebook" title="Facebook">
            <img src={FACEBOOK_ICON} alt="facebook" />
          </a>
          <a href="#google" title="Google">
            <img src={GOOGLE_ICON} alt="google" />
          </a>
          <a href="#twitter" title="Twitter">
            <img src={TWITTER_ICON} alt="twitter" />
          </a>
        </div>
      </div>
      <div className="second">
        <h4>About Us</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="third">
        <h4>Contact Us</h4>
        <div>
          <img className="email" src={EMAIL_ICON} alt="email" />
          <span>giorgi.maisuradze.4@btu.edu.ge</span>
        </div>
        <div>
          <img className="email" src={PHONE_ICON} alt="phone" />
          <span>+995 555 555 555</span>
        </div>
      </div>
    </footer>
  );
};
