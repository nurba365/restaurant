import React, { useState } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    date: '',
    time: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation for ${formData.name}, ${formData.guests} guests on ${formData.date} at ${formData.time}`);
  };

  return (
    <section className="reservation-section">
      <div className="reservation-card">
        <h2 className="reservation-title">Online Reservation</h2>
        <p className="reservation-subtitle">
          Booking request: +44 (800) 1433 555 or fill out the form
        </p>

        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5+">5+ People</option>
            </select>

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="reservation-btn">
            BOOK A TABLE
          </button>
        </form>
      </div>
    </section>
  );
}
