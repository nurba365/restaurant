import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import API_BASE_URL from '../config';
import '../style.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        login(data.token, username);
        navigate('/home');
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch {
      setMessage('Login failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">🔐 Кіру</h2>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Логинді енгізіңіз"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Құпиясөз:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Құпиясөзді енгізіңіз"
            />
          </div>
          <button type="submit" className="btn">Кіру</button>
        </form>
        <p className="login-bottom">
          Аккаунтыңыз жоқ па? <a href="/register">Тіркеліңіз</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
