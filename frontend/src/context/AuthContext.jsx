import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Logout function to remove token and reset user state
  const handleLogout = async () => {
    await AuthService.logout();
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmounting

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const { user, error } = await AuthService.getCurrentUser();
          if (error || !user) {
            console.error("Error fetching user:", error);
            handleLogout();
          } else if (isMounted) {
            setUser(user);
          }
        } catch (err) {
          console.error("Failed to get user data:", err);
          handleLogout();
        }
      }
      if (isMounted) setLoading(false);
    };

    fetchUser();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    setMessage(null);
    setLoading(true);

    const { user, token, error, message } = await AuthService.login(email, password);

    if (error) {
      setError(error);
      setMessage(message);
      setUser(null);
    } else {
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
      setMessage(message);
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, handleLogout, loading, error, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
