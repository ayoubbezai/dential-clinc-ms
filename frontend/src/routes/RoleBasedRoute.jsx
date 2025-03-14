import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useAuth";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { role } = useRole();
    const { loading } = useAuth();
    const [finalRole, setFinalRole] = useState(null);
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWaiting(false);
        }, 2000); // Max wait of 2 seconds

        if (role) {
            setFinalRole(role);
            setIsWaiting(false);
            clearTimeout(timer); // Stop waiting if role is found early
        }

        return () => clearTimeout(timer);
    }, [role]);

    if (loading || isWaiting) {
        return <div>Loading...</div>; // Show loading while waiting
    }

    console.log("RoleBasedRoute: Role =", finalRole, "AllowedRoles =", allowedRoles);

    return finalRole && allowedRoles.includes(finalRole) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" replace />
    );
};

export default RoleBasedRoute;
