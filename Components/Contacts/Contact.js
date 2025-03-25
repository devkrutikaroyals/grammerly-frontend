import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GoogleMapComponent from "../Contacts/GoogleMapComponent"; // Import Google Map
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="contact">
      <header className="contact-header">
        <h1 data-aos="zoom-in">Contact us</h1>
      </header>

      <div className="contact-container">
        <div className="contact-left" data-aos="fade-right">
          <h2>OPENING HOURS: <span className="highlight">24/7</span></h2>
          <p>Most car rental services operate during standard business hours, typically from 8:00 AM to 8:00 PM on weekdays.</p>
          <div className="contact-details">
            <p className="detail">📞 <strong>7798573786</strong></p>
            <p className="detail">
              📍 <strong>Address: Daw, Mohammed Shafiq, Qureshi road Nagpur, plot number 115, Prashant Nagar, Police Line Takli, Nagpur, Maharashtra 440013</strong>
            </p>
          </div>
          <button className="get-taxi-btn">Get Taxi Online</button>
        </div>

        {/* Google Map Section */}
        <div className="contact-right" data-aos="fade-left">
          <h2>Our Location</h2>
          <div className="map-container">
         
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3720.374815702971!2d79.06550372503581!3d21.177264380509467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20Address%3A%20Daw%2C%20Mohammed%20Shafiq%2C%20Qureshi%20road%20Nagpur%2C%20plot%20number%20115%2C%20Prashant%20Nagar%2C%20Police%20Line%20Takli%2C%20Nagpur%2C%20Maharashtra%20440013!5e0!3m2!1sen!2sin!4v1742277481612!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
      ></iframe>
    </div>          
        </div>
      </div>
    </div>
  );
};

export default Contact;
