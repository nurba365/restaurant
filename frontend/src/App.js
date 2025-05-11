import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ReservationForm from './components/ReservationForm';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './style.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen px-4 md:px-10 py-6">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/reservation" element={<ReservationForm />} />
            <Route path="/profile" element={<Profile />} />
          
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
