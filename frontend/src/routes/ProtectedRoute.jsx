import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ListSkeletons from "@/Skeletons/ListSkeletons";
import SceduleSkeleton from "@/Skeletons/SceduleSkeleton";
import SideBarSkeleton from "@/Skeletons/SideBarSkeleton";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        if (location.pathname.startsWith("/patients_list") || location.pathname.startsWith("/appointments_list")) {
            return <div className="flex gap-8"> <SideBarSkeleton /> <ListSkeletons />  </div>

        } else if (location.pathname.startsWith("/schedule")) {
            return <div className="flex gap-8"> <SideBarSkeleton /> <SceduleSkeleton />  </div>


        }
        else {
            return <div>Loading...</div>; // Default loader
        }
    }
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;


