import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setUser(storedUser);
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.log("Failed to parse user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    const { user, error, message } = await AuthService.login(email, password);
    if (error) {
      setError(error);
    } else {
      setUser(user);
      setMessage(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user,  login, loading, error, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
