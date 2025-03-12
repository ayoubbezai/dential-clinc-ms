import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();
    const [role, setRole] = useState("no role");

    useEffect(() => {
        if (user?.role) {
            setRole(user.role);
        } else {
            const storedRole = localStorage.getItem("role");
            if (storedRole) setRole(storedRole);
        }
    }, [user]);

    return role;
};
