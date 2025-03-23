import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "@/hooks/Auth/useRole";
import { useAuth } from "@/hooks/Auth/useAuth";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { role } = useRole();
    const { loading } = useAuth();
    const [finalRole, setFinalRole] = useState(null);
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWaiting(false);
        }, 2000); // max wait of 2 seconds

        if (role) {
            setFinalRole(role);
            setIsWaiting(false);
            clearTimeout(timer); // stop waiting if role found
        }

        return () => clearTimeout(timer);
    }, [role]);

    if (loading || isWaiting) {
        return <div>Loading...</div>; // show loading when waiting
    }

    console.log("RoleBasedRoute: Role =", finalRole, "AllowedRoles =", allowedRoles);

    return finalRole && allowedRoles.includes(finalRole) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" replace />
    );
};

export default RoleBasedRoute;
