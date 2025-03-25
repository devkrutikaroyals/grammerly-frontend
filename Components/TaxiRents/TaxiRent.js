import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./TaxiRent.css";
import sedan from "../images/Ertiga.jpg";
import suv from "../images/bg17.jpg";
import premium from "../images/innova.jpg";
import minivan from "../images/bg19.jpg";

const TaxiFares = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out" });
  }, []);

  const callNumber = "9876543210"; // Replace with the actual phone number

  const cars = [
    {
      title: "Sedan Cabs",
      image: sedan,
      models: "Toyota Etos, Suzuki Dzire, Hyundai Xcent or Similar",
      ac: "2 Bags",
      capacity: "4 Passenger",
      limit: "250Km | 12 Hrs",
      animation: "fade-right",
    },
    {
      title: "SUV Cabs",
      image: suv,
      models: "Mahindra Marazzo,  Maruti Ertiga, Mahindra Xylo or Similar",
      ac: "5 Bags",
      capacity: "6 Passenger",
      limit: "300Km | 12 Hrs",
      animation: "fade-up",
    },
    {
      title: "SUV Premium Cabs",
      image: premium,
      models: "Toyota Innova Crysta or Similar",
      ac: "5 Bags",
      capacity: "7/8 Passenger",
      limit: "300Km | 12 Hrs",
      animation: "fade-left",
    },
    {
      title: "Minivan",
      image: minivan,
      models: "Tempo Traveller or Similar",
      ac: " 10 Bags",
      capacity: "13/17 Passenger",
      limit: "400Km | 12 Hrs",
      animation: "zoom-in",
    },
  ];

  return (
    <div className="taxi-fares">
      <h1 className="page-title" data-aos="fade-down">🚖 Taxi Rent 🚖</h1>
      <div className="cards-container">
        {cars.map((car, index) => (
          <div key={index} className="taxi-card" data-aos={car.animation}>
            <div className="card-content">
              <img src={car.image} alt={car.title} className="car-image" />
              <h3>{car.title}</h3>
              <p><strong>{car.models}</strong></p>
              <p>AC: <strong>{car.ac}</strong></p>
              <p>Capacity: <strong>{car.capacity}</strong></p>
              <p>Limit: <strong>{car.limit}</strong></p>
              <p className="fare-note">(Price Excluded Toll-Tax & Parking)</p>

              {/* Call Redirect Button */}
              <a href={`tel:${callNumber}`} className="book-taxi-btn">Book Taxi</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxiFares;
