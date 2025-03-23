import { useState, useRef, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRole } from "./useRole";
import { navigateToDashboard } from "@/utils/navigation";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const { login, error, message } = useAuth();
    const role = useRole();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (role?.role) {
            console.log("Navigating after login:", role.role);
            navigate(navigateToDashboard(role.role));
        }
    }, [role, navigate]);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setLoading(false);
            return;
        }

        try {
            await login(email, password);
            setIsLoggedIn(true); // Set state to indicate successful login
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };


    return {
        emailRef,
        passwordRef,
        handleSubmitLogin,
        showPassword,
        setShowPassword,
        isLoggedIn,
        loading,
        error,
        message,
    };
};
