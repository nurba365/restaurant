import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style-home.css';

const mockRestaurants = [
  {
    _id: "1",
    name: "Gusto Italiano",
    cuisine: "Итальянская",
    rating: 4.8,
    image: "/images/italian.jpg",
    location: "ул. Солнечная, 12",
  },
  {
    _id: "2",
    name: "Sushi Master",
    cuisine: "Японская",
    rating: 4.6,
    image: "/images/sushi.jpg",
    location: "пр-т Мира, 45",
  },
  {
    _id: "3",
    name: "Борщ и Шашлык",
    cuisine: "Русская/Грузинская",
    rating: 4.7,
    image: "/images/borsh.jpg",
    location: "ул. Победы, 33",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(mockRestaurants);
  }, []);

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <div className="home-container">
      <section className="home-hero">
        <h1 className="hero-title">🍽️ Добро пожаловать в мир вкуса</h1>
        <p className="hero-subtitle">
          Откройте для себя лучшие рестораны вашего города и бронируйте столики за секунды
        </p>
        <input
          type="text"
          placeholder="Поиск по кухням или названиям..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="top-rated-section">
        <h2>🏆 Топ рестораны</h2>
        <div className="card-grid">
          {topRated.map((r) => (
            <div className="card restaurant-card" key={r._id}>
              <img src={r.image} alt={r.name} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{r.name}</h3>
                <p className="card-sub">{r.cuisine} • {r.location}</p>
                <p className="card-rating">⭐ {r.rating}</p>
                <div className="card-links">
                  <Link to={`/restaurants/${r._id}`} className="card-link">Меню</Link>
                  <Link to={`/reviews/${r._id}`} className="card-link">Отзывы</Link>
                  <Link to={`/reservation?restaurant=${r._id}`} className="card-link">Забронировать</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="restaurant-list">
        <h2>🍴 Все рестораны ({filtered.length})</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-600">Ничего не найдено.</p>
        ) : (
          <div className="card-grid">
            {filtered.map((r) => (
              <div className="card restaurant-card" key={r._id}>
                <img src={r.image} alt={r.name} className="card-img" />
                <div className="card-content">
                  <h3 className="card-title">{r.name}</h3>
                  <p className="card-sub">{r.cuisine} • {r.location}</p>
                  <p className="card-rating">⭐ {r.rating}</p>
                  <div className="card-links">
                    <Link to={`/restaurants/${r._id}`} className="card-link">Меню</Link>
                    <Link to={`/reviews/${r._id}`} className="card-link">Отзывы</Link>
                    <Link to={`/reservation?restaurant=${r._id}`} className="card-link">Забронировать</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="how-it-works">
        <h2>🔍 Как это работает?</h2>
        <ul className="steps">
          <li>📍 Найдите ресторан по вкусу</li>
          <li>📖 Ознакомьтесь с меню и отзывами</li>
          <li>📅 Забронируйте столик в 1 клик</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Restaurant Review — Все права защищены.</p>
      </footer>
    </div>
  );
}