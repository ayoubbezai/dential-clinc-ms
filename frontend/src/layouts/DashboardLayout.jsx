import { useLocation } from "react-router-dom";
import { useContext, lazy, Suspense, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";

// Lazy load sidebars
const SideBarDentist = lazy(() => import("../layouts/SideBarDentist"));
const SideBarReceptionist = lazy(() => import("../layouts/SideBarReceptionist"));
const AiChatBot = lazy(() => import("../pages/dentist/AiChatBot"));

const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const sidebarPaths = [
        "/dentist/dashboard",
        "/receptionist/dashboard",
        "/schedule",
        "/users_list",
        "/patients_list",
        "/appointments_list",
        "/payment",
        "/messanger",
        "/receptionist/",
        "/patient/",
        "/inventory",
        "/statistics",
        "/appointments_schedule"
    ];

    const showSidebar = sidebarPaths.some(path =>
        location.pathname.startsWith(path)
    );

    // Memoize the sidebar component to prevent unnecessary re-renders
    const SidebarComponent = useMemo(() => {
        if (user?.role === "dentist") {
            return SideBarDentist;
        } else if (user?.role === "receptionist") {
            return SideBarReceptionist;
        }
        return null;
    }, [user?.role]);
    const AiChatBotComp = useMemo(() => {
        if (user?.role === "dentist") {
            return AiChatBot;
        }
        return null;
    }, [user?.role]);

    return (
        <>
            {AiChatBotComp && (
                <Suspense fallback={<p>Loading AiChatBot...</p>}>
                    <AiChatBotComp />
                </Suspense>
            )}

            <div className="flex">

                {showSidebar && SidebarComponent && (
                    <Suspense fallback={<p>Loading sidebar...</p>}>
                        <SidebarComponent />
                    </Suspense>
                )}
                <div className="flex-grow bg-[#f0f8fa] w-1/2 max-h-screen overflow-auto pb-12">

                    {children}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
