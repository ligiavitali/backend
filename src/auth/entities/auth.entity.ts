import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setToken(token);
      } catch (error) {
        console.error('Token inválido:', error);
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
      }
    }
  }, []); // roda só 1 vez, ao montar

  const login = async (email, password) => {
    const response = await api.post('auth/login', { email, password });
    const jwt = response.data.access_token;
    localStorage.setItem('token', jwt);
    setToken(jwt);
    const decoded = jwtDecode(jwt);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
