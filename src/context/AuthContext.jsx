import React, { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate login with role selection
  const login = (email, role = 'user') => {
    setUser({ email, role });
  };

  // Simulate registration with role selection
  const register = (email, role = 'user') => {
    setUser({ email, role });
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
