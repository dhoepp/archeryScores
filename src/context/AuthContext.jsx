import React, { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate login
  const login = (email) => {
    setUser({ email });
  };

  // Simulate registration
  const register = (email) => {
    setUser({ email });
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
