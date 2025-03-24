import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { AuthService } from "../services/other/AuthService";
import api from "../services/other/api";
import toast from "react-hot-toast";
import _ from "lodash"; // Import Lodash for debouncing

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

const dbounceFetchUser = useMemo(()=>{
  return _.debounce(async ()=>{
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        const { user, error, message } = await AuthService.getCurrentUser();
        if (user !== null) setUser(user);
        if (error !== null) setError(error);
        if (message !== null) setMessage(message);
      } catch (err) {
        setUser(null);
        setError(err);
        toast.error("Failed to fetch user data");
      }
    } else {
      setUser(null);
    }

    setLoading(false);


  }, 100);
}, [localStorage.getItem("token")])
 const fetchUser = useCallback(()=>{
   dbounceFetchUser();


 }, [dbounceFetchUser])


  useEffect(() => {     
    fetchUser();
  }, [localStorage.getItem("token")]); 

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
