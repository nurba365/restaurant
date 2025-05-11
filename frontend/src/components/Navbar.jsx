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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Бренд/Логотип */}
        <Link to="/home" className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-800">
          🍽️ Restaurant Reviews
        </Link>

        {/* Бургер иконка (мобил үшін) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Десктоп навигация */}
        <div className="hidden md:flex space-x-6 text-[17px] font-medium items-center">
          <Link to="/home" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-red-500">Restaurants</Link>
          <Link to="/reservation" className="text-gray-700 hover:text-red-500">Reservation</Link>
          <Link to="/profile" className="text-gray-700 hover:text-red-500">Profile</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          )}
        </div>
      </div>

      {/* Мобиль навигация (бургер ашылғанда) */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 border-t">
          <Link to="/home" className="block text-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/restaurants" className="block text-gray-700" onClick={() => setIsOpen(false)}>Restaurants</Link>
          <Link to="/reservation" className="block text-gray-700" onClick={() => setIsOpen(false)}>Reservation</Link>
          <Link to="/profile" className="block text-gray-700" onClick={() => setIsOpen(false)}>Profile</Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block text-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-gray-700" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
