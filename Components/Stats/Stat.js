// Stats.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Stats/Stat.css"; // Create a CSS file for styling the stats

function Stats() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="stats-section">
      <div className="stat-item" data-aos="fade-up">
        <h2>10,000+</h2>
        <p>Happy Customers</p>
      </div>
      <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
        <h2>5,000+</h2>
        <p>Successful Rides</p>
      </div>
      <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
        <h2>100+</h2>
        <p>Destinations Covered</p>
      </div>
      <div className="stat-item" data-aos="fade-up" data-aos-delay="600">
        <h2>24/7</h2>
        <p>Customer Support</p>
      </div>
    </div>
  );
}

export default Stats;
