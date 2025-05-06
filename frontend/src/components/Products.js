import React from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
  const productList = [
    { id: 1, name: 'Restaurant A' },
    { id: 2, name: 'Restaurant B' },
    { id: 3, name: 'Restaurant C' },
  ];

  return (
    <div className="container">
      <h2>Products</h2>
      <ul id="products">
        {productList.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <h3>{product.name}</h3>
            </div>
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="btn">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
