import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//custmore hook for auth so no need to call auth context each time

export const useAuth = () => useContext(AuthContext);