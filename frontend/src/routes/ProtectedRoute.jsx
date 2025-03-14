import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Adjust the path if needed

const ProtectedRoute = () => {
    const { user, loading } = useAuth();


    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Renders the protected child routes
};

export default ProtectedRoute;
