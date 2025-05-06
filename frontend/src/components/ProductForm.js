import React, { useState } from 'react';

export default function ProductForm() {
  const [productName, setProductName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', productName);
  };

  return (
    <div className="container">
      <h2>Product Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
