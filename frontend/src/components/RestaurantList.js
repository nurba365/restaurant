import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/restaurants`);
        const data = await res.json();

        const formatted = data.map((r) => ({
          ...r,
          image: r.image || '/images/default.jpg',
          address: r.address || 'Адрес не указан',
          rating: r.rating || 4.5,
        }));

        setRestaurants(formatted);
        setFiltered(formatted);
      } catch (err) {
        console.error('Ошибка загрузки ресторанов:', err);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      restaurants.filter((r) =>
        r.name.toLowerCase().includes(lower)
      )
    );
  }, [search, restaurants]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🍴 Рестораны</h2>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <p className="text-gray-500 mt-4">
          Выберите ресторан, чтобы просмотреть отзывы и добавить свои впечатления.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((r) => (
          <div key={r._id || r.id} className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <img src={r.image} alt={r.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.cuisine} • {r.address}</p>
              <p className="text-yellow-500 font-semibold text-sm mt-1">⭐ {r.rating}</p>
              <div className="flex justify-between text-sm text-blue-600 mt-3 font-medium">
                <Link to={`/restaurants/${r._id}`} className="hover:underline">Меню</Link>
                <Link to={`/reviews/${r._id}`} className="hover:underline">Отзывы</Link>
                <Link to={`/reservation?restaurant=${r._id}`} className="hover:underline">Забронировать</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
