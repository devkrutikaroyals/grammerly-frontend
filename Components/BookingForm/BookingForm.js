import React, { useState } from "react";
import "../BookingForm/BookingForm.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ride booked successfully for ${formData.name}!`);
    setFormData({
      name: "",
      pickup: "",
      drop: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="booking-form">
      <h2>Book a Ride</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pickup Location:
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Drop Location:
          <input
            type="text"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;
