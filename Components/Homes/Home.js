import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "../Homes/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import Stats from "../Stats/Stat";
import TaxiFares from "../TaxiRents/TaxiRent";
import Services from "../Services/Service";
import AboutPage from "../Abouts/About";

function Home() {
  const [rideType, setRideType] = useState("Local");
  const [isOpen, setIsOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const whatsappNumber = "7798573786";
  const callNumber = "9876543210";
  const message = `Hello, I would like to book a ${rideType} ride!`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const callLink = `tel:${callNumber}`;

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setShowButtons(window.scrollY <= lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    window.location.href = callLink;
  };

  return (
    <>
      <div className="home">
        <div className={`ride-options ${showButtons ? "visible" : "hidden"}`} data-aos="fade-down">
          {["One Way", "Outstation", "Local", "Airport"].map((option) => (
            <button
              key={option}
              className={`ride-option-button ${rideType === option ? "active" : ""}`}
              onClick={() => setRideType(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Floating Button */}
        <div className="floating-button" data-aos="fade-left">
          <button className="main-button btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faSuitcase} size="2x" />
          </button>

          {isOpen && (
            <div className="expanded-buttons">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button btn btn-success">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              </a>
              <a href={callLink} className="call-button btn btn-light">
                <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
              </a>
            </div>
          )}
        </div>

        {/* Home Content */}
        <div className="home-content" data-aos="zoom-in">
          <h1>Welcome to Shriram Cabs</h1>
          <p>Ride Comfortably, Arrive Safely!</p>

          {/* Booking Section */}
          <div className="booking-section" data-aos="fade-up">
            <h3>Selected Ride: {rideType}</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="pickup-location">Pick-up Location</label>
                <select id="pickup-location" className="form-control">
                  <option>Nagpur</option>
                  <option>Airport</option>
                  <option>Railway Station</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="car-type">Choose a Car</label>
                <select id="car-type" className="form-control">
                  <option>Sedan - 5 Seats</option>
                  <option>SUV - 7 Seats</option>
                  <option>Hatchback - 4 Seats</option>
                  <option>Premium- 5 Seats</option>
                  <option>MUV- 5 Seats</option>
                </select>
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="start-date">Start Date</label>
                <input type="text" id="start-date" className="form-control" placeholder="DD/MM/YYYY" />
              </div>
              <div className="form-group">
                <label htmlFor="end-date">End Date</label>
                <input type="text" id="end-date" className="form-control" placeholder="DD/MM/YYYY" />
              </div>
            </div>
            <button className="book-now-button btn btn-primary" onClick={handleBookNow} data-aos="flip-up">
              Book Your Ride Now
            </button>
          </div>
        </div>
      </div>

      <TaxiFares data-aos="fade-up" />
      <Services data-aos="fade-up" />
      <AboutPage data-aos="fade-up" />
      <Stats data-aos="fade-up" />
    </>
  );
}

export default Home;
