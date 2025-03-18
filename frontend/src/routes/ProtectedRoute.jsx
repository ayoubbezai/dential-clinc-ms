import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Ensure the path is correct

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                setRedirect(true);
            }
        }, 3000); // 3 seconds timeout before redirecting to login

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || redirect) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Render protected content if authenticated
};

export default ProtectedRoute;
