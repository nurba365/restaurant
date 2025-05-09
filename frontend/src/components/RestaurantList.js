import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/restaurants`);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error('Ошибка загрузки ресторанов:', err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="container">
      <h2>🍴 Рестораны</h2>
      <p style={{ marginBottom: "20px" }}>Выберите ресторан, чтобы просмотреть отзывы и добавить свои впечатления.</p>
      <div className="card-grid">
        {restaurants.map((r) => (
          <div className="card" key={r._id || r.id}>
            <div className="card-content">
              <h3 className="card-title">{r.name}</h3>
              <p className="card-sub">Кухня: {r.cuisine}</p>
              <p className="card-rating">⭐ {r.rating || '4.5'}</p>
              <div className="card-links">
                <Link to={`/restaurants/${r._id}`} className="card-link">Подробнее</Link>
                <Link to={`/reservation?restaurant=${r._id}`} className="card-link">Забронировать</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
