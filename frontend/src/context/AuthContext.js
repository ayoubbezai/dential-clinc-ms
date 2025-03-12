import {Children, createContext , useEffect , useState} from "react"
import { AuthService } from "../services/AuthService"
import api from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({Children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(()=>{
        const 
    })
}