import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menu, setMenu] = useState([]);
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
      setMenu(data);
    };

    fetchRestaurant();
    fetchReviews();
    fetchMenu();
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

  if (!restaurant) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
        <p><strong>🍽 Кухня:</strong> {restaurant.cuisine}</p>
        <p><strong>📍 Адрес:</strong> {restaurant.address}</p>
        <p><strong>⭐ Рейтинг:</strong> {restaurant.rating}</p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">📋 Меню</h3>
        {menu.length === 0 ? (
          <p className="text-gray-500">Меню пока не добавлено.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {menu.map((item) => (
              <div key={item._id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition">
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
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">📝 Отзывы</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 mb-4">Пока нет отзывов. Будьте первым!</p>
        ) : (
          <ul className="mb-6 space-y-3">
            {reviews.map((r, i) => (
              <li key={i} className="border-b pb-2">
                <span>💬 {r.text}</span>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmitReview} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Оставьте отзыв:</label>
          <textarea
            className="w-full border rounded p-2"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Напишите, как вам понравилось обслуживание или еда..."
            required
          />
          <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Отправить отзыв
          </button>
        </form>
      </div>
    </div>
  );
}
