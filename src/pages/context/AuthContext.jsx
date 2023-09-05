// src/context/AuthContext.js
import  { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);



  const login = (userData) => {
    setUser(userData);
    setToken(userData.token); // Assuming userData contains a 'token' property
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

