import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          setLoading(true);

          const { user, error, message } = await AuthService.getCurrentUser();
          setError(error);
          setUser(user);
          setMessage(message)
          setLoading(false);


        } catch (err) {
          setError(err);


        }
      }
    };

    fetchUser();

  }, []);

  const login = async (email, password) => {
    setError(null);
    setMessage(null);
    setLoading(true);

    const { user, error, message } = await AuthService.login(email, password);

    setError(error);
    setMessage(message);
    setUser(user);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, loading, error, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
