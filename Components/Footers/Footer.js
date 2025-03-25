import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>About Us</h3>
          <p>
            At Royalswebtech, we are passionate about delivering top-notch
            digital solutions to help businesses grow.
          </p>
        </div>
        <div className="footer-middle">
          <h3>Quick Links</h3>
          <nav className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Route</Link>
            <Link to="/contact">Contact us</Link>
          </nav>
        </div>
        <div className="footer-right">
          <h3>Contact Us</h3>
          <p>Email: support@royalswebtech.com</p>
          <p>Phone: 91+ 7798573786</p>
          <p>Address: Nagpur, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Royals Webtech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
