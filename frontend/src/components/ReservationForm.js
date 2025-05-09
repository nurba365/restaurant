import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function ReservationForm() {
  const [params] = useSearchParams();
  const restaurantId = params.get('restaurant');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    date: '',
    time: '',
    message: '',
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, restaurantId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Бронирование успешно отправлено!');
      } else {
        setSuccessMsg('Ошибка при бронировании.');
      }
    } catch {
      setSuccessMsg('Ошибка сервера. Попробуйте снова.');
    }
  };

  return (
    <div className="container">
      <h2 className="login-title">📅 Бронирование стола</h2>
      {successMsg && <div className="message success">{successMsg}</div>}
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label>Ваше имя:</label>
          <input
            name="name"
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Телефон:</label>
          <input
            name="phone"
            type="tel"
            placeholder="+7..."
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Количество гостей:</label>
          <select name="guests" value={formData.guests} onChange={handleChange} required>
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
            <option value="5+">5+ гостей</option>
          </select>
        </div>
        <div className="form-group">
          <label>Дата и время:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Комментарий:</label>
          <textarea
            name="message"
            placeholder="Дополнительная информация (необязательно)"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">Забронировать</button>
      </form>
    </div>
  );
}
