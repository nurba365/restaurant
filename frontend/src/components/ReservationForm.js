import React, { useState } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({ name: '', date: '', guests: 1 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation for ${formData.name} on ${formData.date} for ${formData.guests} guests!`);
  };

  return (
    <div className="container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label htmlFor="name">Name</label>
        <input name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="date">Date & Time</label>
        <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />

        <label htmlFor="guests">Guests</label>
        <input name="guests" type="number" min="1" value={formData.guests} onChange={handleChange} required />

        <button type="submit" className="btn">Reserve</button>
      </form>
    </div>
  );
}
