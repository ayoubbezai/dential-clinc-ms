import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an AuthContext

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Prevent redirect until loading is done

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;