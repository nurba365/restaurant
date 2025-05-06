import React from 'react';
import { Link } from 'react-router-dom';

const dummyRestaurants = [
  { id: 1, name: 'Pizza Palace', rating: 4.3 },
  { id: 2, name: 'Sushi World', rating: 4.7 },
];

export default function RestaurantList() {
  return (
    <div className="container">
      <h2>Our Restaurants</h2>
      <div className="card-grid">
        {dummyRestaurants.map((r) => (
          <div className="card" key={r.id}>
            <div className="card-content">
              <h3 className="card-title">{r.name}</h3>
              <p className="card-sub">Rating: {r.rating} ⭐</p>
              <div className="card-links">
                <Link to={`/restaurants/${r.id}`} className="card-link">View</Link>
                <a href="#" className="card-link">Book</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
