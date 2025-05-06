import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Home from './components/Home'
import Products from './components/Products';
import Register from './components/Register';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ReservationForm from './components/ReservationForm';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './style.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="*" element={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
