import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/home">🍽️ Restaurant Reviews</Link>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/restaurants" className="navbar-link">Restaurants</Link>
          <Link to="/reservation" className="navbar-link">Reservation</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-link logout">Logout</button>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
