import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductItem() {
  const { id } = useParams();
  return (
    <div className="container">
      <h2>Product Details</h2>
      <p>Details for product with ID: {id}</p>
    </div>
  );
}
