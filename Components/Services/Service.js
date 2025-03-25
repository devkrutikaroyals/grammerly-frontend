import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Service.css";
import services1 from "../images/Nagpur-Taxi-Services (1).jpg";
import services2 from "../images/Nagpur to Amravati.jpg";
import services3 from "../images/innova.jpg";
import services5 from "../images/bg17.jpg";
import services6 from "../images/innova2.jpg";
import services12 from "../images/Des1.jpg"; 
import services13 from "../images/Des2.jpg"; 

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const serviceCards = [
    { img: services1, title: "Nagpur Taxi Service", description: "Reliable taxi services within Nagpur city.", details: "Perfect for daily commutes and city tours.", whatsappNumber: "91-7798573786" },
    { img: services2, title: "Nagpur To Amravati Taxi", description: "Comfortable and timely rides between Nagpur and Amravati.", details: "Hassle-free long-distance travel.", whatsappNumber: "91-7798573786" },
    { img: services3, title: "Long Journey Taxi", description: "Enjoy long-distance journeys with comfort.", details: "Safe and convenient for long trips.", whatsappNumber: "91-7798573786" },
    { img: services5, title: "Outstation Taxi", description: "Affordable taxi for weekend getaways or business trips.", details: "Plan your outstation travel easily.", whatsappNumber: "91-7798573786" },
    { img: services6, title: "Nagpur Best Car Service", description: "Premium car service with top-class comfort.", details: "Ideal for business and luxury travel.", whatsappNumber: "91-7798573786" },
    { img: services12, title: "Nagpur Jungle Safari Taxi", description: "Explore Nagpur’s wildlife with ease.", details: "A perfect ride for jungle safaris.", whatsappNumber: "91-7798573786" },
    { img: services13, title: "Tadoba Taxi Service", description: "Seamless travel to Tadoba National Park.", details: "Enjoy a smooth safari adventure.", whatsappNumber: "91-7798573786" },
  ];

  const handleBookNowClick = (phoneNumber, serviceTitle) => {
    const message = `I'd like to book the service: ${serviceTitle}.`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="services">
      <div className="services-header" data-aos="fade-down">
        <h2>Our Services</h2>
      </div>

      <div className="services-cards">
        {serviceCards.map((card, index) => (
          <div key={index} className="service-card" data-aos="fade-up">
            <img src={card.img} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="button-container">
              <button className="book-now-btn" onClick={() => handleBookNowClick(card.whatsappNumber, card.title)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
