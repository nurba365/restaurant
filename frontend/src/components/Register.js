import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import '../style.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`,
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Тіркелу сәтті өтті!');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(data.message || 'Қате пайда болды');
        setMessageType('error');
      }
    } catch {
      setMessage('Сервермен байланыс жоқ.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">📝 Тіркелу</h2>
        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="username"
              placeholder="Пайдаланушы аты"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Электрондық пошта"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Құпиясөз:</label>
            <input
              type="password"
              name="password"
              placeholder="Құпиясөз"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Тіркелу</button>
        </form>
        <p className="login-bottom">
          Аккаунтыңыз бар ма? <a href="/login">Кіру</a>
        </p>
      </div>
    </div>
  );
}
