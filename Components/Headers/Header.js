import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Headers/Header.css';
import logo from '../images/logo.png'; // Import your logo image

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="home-header">
        <img src={logo} alt="Shri Ram Cab Services Logo" className="home-logo" />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services" >Service</Link>
        
       
        <Link to="/taxi-rent">Fleet leese</Link>
        <Link to="/our-routes" >Route</Link>
        <Link to="/about">About Us </Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}

export default Header;