import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/other/AuthService";
import api from "../services/other/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          const { user, error, message } = await AuthService.getCurrentUser();
          setUser(user);
          setError(error);
          setMessage(message);
        } catch (err) {
          setUser(null); // Ensure user is set to null on failure
          setError(err);
        }
      } else {
        setUser(null); // Explicitly set user to null if no token
      }

      setLoading(false); // Ensure loading is set to false in all cases
    };

    fetchUser();
  }, []);


  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { user, error, message } = await AuthService.login(email, password);
    console.log(user)

    setError(error);
    setMessage(message);
    setUser(user);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    const { error, message } = await AuthService.logout();
    setError(error);
    setMessage(message);
    setLoading(false);
    toast.success("logout successfully")
    window.location.href = "/";

  }

  return (
    <AuthContext.Provider value={{ user, login, loading, error, message, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
