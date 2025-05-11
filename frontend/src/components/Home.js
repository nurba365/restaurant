import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style-home.css';
import API_BASE_URL from '../config';

export default function Home() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/restaurants`);
        const data = await res.json();

        // Кей ресторандарда image мен location жоқ болса, бос мән беріп жібереміз
        const formatted = data.map(r => ({
          ...r,
          image: r.image || "/images/default.jpg", // default сурет
          location: r.address || "Неизвестный адрес",
          rating: r.rating || 4.5 // default рейтинг
        }));

        setRestaurants(formatted);
      } catch (err) {
        console.error("Ошибка загрузки ресторанов:", err);
      }
    };

    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <div className="home-container">
      <section className="bg-gradient-to-r from-pink-400 to-orange-400 text-white py-14 px-6 rounded-3xl shadow-lg mt-5 mb-10">
  <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 flex justify-center items-center gap-2">
    🍽 Добро пожаловать в мир вкуса
  </h1>
  <p className="text-center text-lg md:text-xl mb-6">
    Откройте для себя лучшие рестораны вашего города и бронируйте столики за секунды
  </p>
  <div className="flex justify-center">
    <input
      type="text"
      placeholder="Поиск по кухням или названиям..."
      className="w-full max-w-md px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
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
