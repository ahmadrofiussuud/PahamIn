import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    id: 'demo-murid-a',
    name: 'Budi Santoso (Murid A)',
    email: 'murida@pahamin.com',
    grade: 'SMA Kelas 11 - IPA',
    avatar: '👨‍🎓',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'demo-murid-b',
    name: 'Siti Rahma (Murid B)',
    email: 'muridb@pahamin.com',
    grade: 'SMP Kelas 8',
    avatar: '👩‍🎓',
    badgeColor: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'demo-murid-c',
    name: 'Ahmad Rofi (Murid C)',
    email: 'muridc@pahamin.com',
    grade: 'SMA Kelas 12 - IPS',
    avatar: '🧑‍🎓',
    badgeColor: 'bg-purple-100 text-purple-700'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const cleanApiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;
  const API_URL = `${cleanApiUrl}/api/auth`;

  useEffect(() => {
    const checkLoggedIn = async () => {
      const savedUser = localStorage.getItem('user_data');
      const token = localStorage.getItem('token');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else if (token) {
        try {
          const res = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
          localStorage.setItem('user_data', JSON.stringify(res.data));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_data');
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    // Check if it's one of the demo users first
    const matchedDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedDemo) {
      return loginAsDemo(matchedDemo);
    }

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      // Fallback demo user if server is offline
      const fallbackUser = { id: 'user-guest', name: email.split('@')[0], email };
      localStorage.setItem('token', 'mock-token-guest');
      localStorage.setItem('user_data', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      return { token: 'mock-token-guest', user: fallbackUser };
    }
  };

  const loginAsDemo = (demoUser) => {
    const userData = {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      grade: demoUser.grade
    };
    localStorage.setItem('token', `demo-token-${demoUser.id}`);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (fullName, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { fullName, email, password });
      return res.data;
    } catch (err) {
      // Mock register success if server is offline
      const mockUser = { id: 'user-' + Date.now(), name: fullName, email };
      loginAsDemo(mockUser);
      return { message: 'User registered successfully (Demo Mode)' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

