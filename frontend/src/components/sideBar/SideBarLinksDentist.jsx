import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    MdOutlineSpaceDashboard,
    MdOutlinePeopleAlt,
    MdOutlineCalendarToday,
    MdOutlineDescription,
    MdOutlineSettings,
    MdOutlineGroups,
    MdOutlineInventory,
    MdOutlineAutoAwesome,
    MdOutlineForum,
    MdOutlinePayment
} from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";

const iconComponents = {
    dashboard: <MdOutlineSpaceDashboard size={16} />,
    patients: <MdOutlinePeopleAlt size={16} />,
    appointments: <MdOutlineCalendarToday size={16} />,
    documents: <MdOutlineDescription size={16} />,
    notifications: <IoNotificationsOutline size={16} />,
    settings: <MdOutlineSettings size={16} />,
    users: <MdOutlineGroups size={16} />,
    calendar: <MdOutlineCalendarToday size={16} />,
    inventory: <MdOutlineInventory size={16} />,
    ai: <MdOutlineAutoAwesome size={16} />,
    chat: <MdOutlineForum size={16} />,
    payment: <MdOutlinePayment size={16} />
};

const SideBarLinksDentist = ({ isOpen }) => {
    const location = useLocation();
    const { t } = useTranslation('sidebar');

    const menuItems = [
        { name: t('overview'), link: "/dentist/dashboard", icon: "dashboard" },
        { name: t('schedule'), link: "/schedule", icon: "calendar" },
        { name: t('patients'), link: "/patients_list", icon: "patients" },
        { name: t('appointments'), link: "/appointments_list", icon: "appointments" },
        { name: t('users'), link: "/users_list", icon: "users" },
        { name: t('payment'), link: "/payment", icon: "payment" },
        { name: t('inventory'), link: "/inventory", icon: "inventory" },
        { name: t('chat'), link: "/messanger", icon: "chat" }
    ];

    return (
        <div className={`w-full px-4 mt-2 ${isOpen ? "space-y-[14px]" : "space-y-[18px]"}`}>
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    to={item.link}
                    className={`flex items-center gap-3 py-1 px-3 rounded-lg transition-colors ${location.pathname === item.link
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100 text-xs"
                        }`}
                >
                    {iconComponents[item.icon] || <MdOutlineDescription size={16} />}
                    {isOpen && <span className="text-sm">{item.name}</span>}
                </Link>
            ))}
        </div>
    );
};

export default SideBarLinksDentist;
