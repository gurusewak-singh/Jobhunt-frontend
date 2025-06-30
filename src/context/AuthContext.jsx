// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axiosInstance.js'; // ✅ Use the correct centralized axios instance

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount (if token exists)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch (err) {
        console.error('Fetch user error:', err);
        // If the token is invalid, clear it
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // login method: set user and store token
  const login = (userData, token) => {
    setUser(userData);
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  // ✅ CORRECTED LOGOUT FUNCTION
  const logout = () => {
    // Logout is a client-side action: clear user state and token.
    // No API call is needed unless you have a refresh token blacklist on the backend.
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// No need for default export if you export AuthProvider directly

export default AuthProvider;
