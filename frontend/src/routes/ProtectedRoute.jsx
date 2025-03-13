import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
    const { user } = useAuth();

    console.log("ProtectedRoute: User =", user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }


    return <Outlet />; // IMPORTANT: This renders child routes
};

export default ProtectedRoute;
