import { useState, useRef } from "react";
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

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate(navigateToDashboard(role));
        } catch (error) {
            console.log("Login error:", error);
        } finally {
            setLoading(false);
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }
    };

    return {
        emailRef,
        passwordRef,
        handleSubmitLogin,
        showPassword,
        setShowPassword,
        loading,
        error,
        message,
    };
};
