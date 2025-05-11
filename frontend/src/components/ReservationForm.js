import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    restaurantId: '',
    name: '',
    phone: '',
    guests: '1',
    date: '',
    time: '',
    message: '',
  });

  const [restaurants, setRestaurants] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/restaurants`);
        const data = await res.json();
        setRestaurants(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, restaurantId: data[0]._id }));
        }
      } catch (err) {
        console.error('Ошибка при загрузке ресторанов:', err);
      }
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        const restaurant = restaurants.find(r => r._id === formData.restaurantId);
        setSuccessMsg(`Бронирование в "${restaurant?.name}" успешно отправлено!`);
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
          <label>Выберите ресторан:</label>
          <select
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            required
          >
            {restaurants.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </div>

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
