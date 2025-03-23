import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SideBarDentist from "../layouts/SideBarDentist";
import SideBarReceptionist from "../layouts/SideBarReceptionist";

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
        "/patient/"
    ];

    const showSidebar = sidebarPaths.includes(location.pathname) ||
        location.pathname.startsWith("/patient/");
    const renderSidebar = () => {
        if (user?.role === "dentist") {
            return <SideBarDentist />;
        } else if (user?.role === "receptionist") {
            return <SideBarReceptionist />;
        }
        return null;
    };

    return (
        <div className="flex">
            {showSidebar && renderSidebar()}
            <div className="flex-grow w-1/2 max-h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default DashboardLayout;