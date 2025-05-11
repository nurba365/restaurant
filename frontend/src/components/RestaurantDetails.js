import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetch(`${API_BASE_URL}/api/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
    };

    const fetchReviews = async () => {
      const res = await fetch(`${API_BASE_URL}/api/restaurants/${id}/reviews`);
      const data = await res.json();
      setReviews(data);
    };

    const fetchMenu = async () => {
      const res = await fetch(`${API_BASE_URL}/api/menu/restaurant/${id}`);
      const data = await res.json();
      setMenu(Array.isArray(data) ? data : data.menu || []);
    };

    const fetchReservations = async () => {
      const res = await fetch(`${API_BASE_URL}/api/reservations/${id}`);
      const data = await res.json();
      setReservations(data);
    };

    fetchRestaurant();
    fetchReviews();
    fetchMenu();
    fetchReservations();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const res = await fetch(`${API_BASE_URL}/api/restaurants/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newReview }),
    });

    const data = await res.json();
    if (data.success) {
      setReviews([...reviews, data.review]);
      setNewReview('');
    }
  };

  if (!restaurant) return <div className="text-center py-10 text-lg">Загрузка...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Restaurant Info */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10 flex flex-col md:flex-row gap-6">
        <img
          src={restaurant.image || "/images/default.jpg"}
          alt={restaurant.name}
          className="w-full md:w-1/3 h-64 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-gray-700 mb-1"><strong>🍽 Кухня:</strong> {restaurant.cuisine}</p>
          <p className="text-gray-700 mb-1"><strong>📍 Адрес:</strong> {restaurant.address}</p>
          <p className="text-yellow-500 font-semibold text-md"><strong>⭐ Рейтинг:</strong> {restaurant.rating}</p>
        </div>
      </div>

      {/* Меню */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📋 Меню</h2>
        {menu.length === 0 ? (
          <p className="text-gray-500 italic">Меню пока не добавлено.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {menu.map((item) => (
              <div key={item._id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md">
                <h4 className="text-lg font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-700">
                  <span className="font-semibold text-red-600">{item.price} ₸</span>
                  <span className="italic">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Бронирование */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📅 Бронирования</h2>
        {reservations.length === 0 ? (
          <p className="text-gray-500 italic">Пока нет бронирований.</p>
        ) : (
          <ul className="space-y-3">
            {reservations.map((r) => (
              <li key={r._id} className="bg-white p-4 border rounded shadow-sm text-sm">
                <strong>{r.date} {r.time}</strong> — {r.name}, {r.guests} гостей, 📞 {r.phone}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Отзывы */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📝 Отзывы</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 mb-4 italic">Пока нет отзывов. Будьте первым!</p>
        ) : (
          <ul className="mb-6 space-y-3">
            {reviews.map((r, i) => (
              <li key={i} className="bg-white p-3 border rounded shadow-sm text-sm">
                💬 {r.text}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmitReview} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Оставьте отзыв:</label>
          <textarea
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Напишите, как вам понравилось обслуживание или еда..."
            required
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded"
          >
            Отправить отзыв
          </button>
        </form>
      </section>
    </div>
  );
}
