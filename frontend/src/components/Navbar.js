import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // иконки

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">🍽️ Restaurant Reviews</Link>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/restaurants" className="navbar-link">Restaurants</Link>
          <Link to="/reservation" className="navbar-link">Reservation</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          <Link to="/products" className="navbar-link">Products</Link>
          <Link to="/productform" className="navbar-link">Product Form</Link>
          <Link to="/login" className="navbar-link logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
