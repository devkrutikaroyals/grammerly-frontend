import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos';

// Import car images
import SedanImage from '../images/Ertiga.jpg';
import ErtigaImage from '../images/Ertiga.jpg';
import InnovaImage from '../images/innova.jpg';
import InnovaCrystaImage from '../images/innova2.jpg';

const OurCabs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <div className="our-cabs">
      <h1 data-aos="fade-up">Our Cars</h1>
      <div className="cars-container">
        {/* Sedan */}
        <div className="car-card" data-aos="zoom-in">
          <img src={SedanImage} alt="Sedan" />
          <h2>Sedan</h2>
          <ul>
            <li>Capacity: 4 + Driver</li>
            <li>Luggage: 2 Big + 2 Small</li>
            <li>Music Player: Yes</li>
            <li>AC: Yes</li>
          </ul>
          <button className="book-button">Book Car</button>
        </div>

        {/* Ertiga */}
        <div className="car-card" data-aos="zoom-in" data-aos-delay="200">
          <img src={ErtigaImage} alt="Ertiga" />
          <h2>Ertiga</h2>
          <ul>
            <li>Capacity: 6 + Driver</li>
            <li>Luggage: 2 Big + 2 Small</li>
            <li>Music Player: Yes</li>
            <li>AC: Yes</li>
          </ul>
          <button className="book-button">Book Car</button>
        </div>

        {/* Innova */}
        <div className="car-card" data-aos="zoom-in" data-aos-delay="400">
          <img src={InnovaImage} alt="Innova" />
          <h2>Innova</h2>
          <ul>
            <li>Capacity: 6/7 + Driver</li>
            <li>Luggage: 2 Big + 2 Small</li>
            <li>Music Player: Yes</li>
            <li>AC: Yes</li>
          </ul>
          <button className="book-button">Book Car</button>
        </div>

        {/* Innova Crysta */}
        <div className="car-card" data-aos="zoom-in" data-aos-delay="600">
          <img src={InnovaCrystaImage} alt="Innova Crysta" />
          <h2>Innova Crysta</h2>
          <ul>
            <li>Capacity: 6/7 + Driver</li>
            <li>Luggage: 2 Big + 2 Small</li>
            <li>Music Player: Yes</li>
            <li>AC: Yes</li>
          </ul>
          <button className="book-button">Book Car</button>
        </div>
      </div>
    </div>
  );
};

export default OurCabs;
