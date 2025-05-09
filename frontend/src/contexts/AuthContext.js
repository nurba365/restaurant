import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ дұрыс импорт

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (token) {
          const decoded = jwtDecode(token); // ✅ дұрыс қолдану
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setIsAuthenticated(true);
            setUsername(decoded.username || username);
          }
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      } catch {
        logout();
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = (newToken, newUsername) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      token,
      username,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
