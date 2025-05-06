import React from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantDetails() {
  const { id } = useParams();

  return (
    <div className="container">
      <h2>Restaurant #{id}</h2>
      <p>Explore our finest dishes and reviews.</p>

      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <h3 className="card-title">Margherita Pizza</h3>
            <p className="card-sub">Classic tomato & mozzarella</p>
            <p className="card-rating">⭐ 4.5</p>
            <div className="card-links">
              <a href="#" className="card-link">Order</a>
              <a href="#" className="card-link">Details</a>
            </div>
          </div>
        </div>
        {/* Можно повторить карточки с разными блюдами */}
      </div>
    </div>
  );
}
