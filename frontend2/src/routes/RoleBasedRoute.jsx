import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "@/hooks/useRole";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { role } = useRole();

    if (!role) {
        return <div>Loading...</div>; // Prevents premature redirection
    }
    console.log("RoleBasedRoute: Role =", role, "AllowedRoles =", allowedRoles);

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RoleBasedRoute;
