import React, { useState } from "react";
import "./About.css";

const AboutPage = () => {
  // State to track which card's more info is open
  const [openInfo, setOpenInfo] = useState(null);

  // Toggle function for showing more information
  const toggleInfo = (section) => {
    setOpenInfo(openInfo === section ? null : section);
  };

  return (
    <div className="about-page">
      {/* Banner Section */}
      <div className="banner-section">
        <h1>About Shriram Cabs</h1>
        <p>
          Shriram Cabs is a trusted cab service provider committed to delivering
          safe, affordable, and reliable transport solutions. Whether you're
          traveling locally or planning an outstation journey, we ensure a
          comfortable ride every step of the way.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="why-cards">
          <div className="card">
            <h3>💸 Affordable Pricing</h3>
            <p>
              Enjoy competitive pricing without compromising on quality. We
              ensure our services are affordable for everyone.
            </p>
            <button onClick={() => toggleInfo("affordablePricing")}>
              Get More Information
            </button>
            {openInfo === "affordablePricing" && (
              <div className="extra-info">
                <p>
                  Our pricing model is transparent and flexible. Whether you
                  need a quick city ride or an outstation trip, we offer
                  affordable rates based on distance, time, and vehicle type. We
                  also provide special discounts for regular customers and
                  corporate clients.
                </p>
              </div>
            )}
          </div>
          <div className="card">
            <h3>🚗 Wide Range of Vehicles</h3>
            <p>
              Choose from a wide variety of vehicles tailored to your travel
              needs, from compact cars to luxury options.
            </p>
            <button onClick={() => toggleInfo("wideRange")}>
              Get More Information
            </button>
            {openInfo === "wideRange" && (
              <div className="extra-info">
                <p>
                  We offer a fleet of vehicles to meet all your travel needs,
                  whether you're looking for a comfortable sedan, a spacious
                  SUV, or even a luxury car for special occasions. All our
                  vehicles are well-maintained and equipped with modern
                  amenities.
                </p>
              </div>
            )}
          </div>
          <div className="card">
            <h3>🛡️ Safety First</h3>
            <p>
              Your safety is our priority. Our vehicles are equipped with
              advanced safety features and regularly maintained.
            </p>
            <button onClick={() => toggleInfo("safetyFirst")}>
              Get More Information
            </button>
            {openInfo === "safetyFirst" && (
              <div className="extra-info">
                <p>
                  We adhere to strict safety standards, including GPS tracking,
                  real-time monitoring, and regular safety checks on our vehicles.
                  Our drivers are professionally trained to ensure your safety
                  throughout the journey.
                </p>
              </div>
            )}
          </div>
          <div className="card">
            <h3>📞 24/7 Customer Support</h3>
            <p>
              Our dedicated support team is available round-the-clock to assist
              you with any queries or emergencies.
            </p>
            <button onClick={() => toggleInfo("customerSupport")}>
              Get More Information
            </button>
            {openInfo === "customerSupport" && (
              <div className="extra-info">
                <p>
                  Our customer support team is available 24/7 via phone, email,
                  or live chat to assist with booking, track your ride, or
                  handle any concerns. We are always ready to help you have a
                  smooth journey.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

  

    
    </div>
  );
};

export default AboutPage;
