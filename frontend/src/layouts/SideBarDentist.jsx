import React, { useState } from 'react';
import { MdMenu, MdMenuOpen, MdLogout, MdDashboard, MdList, MdPages } from "react-icons/md";
import { FiUser, FiCalendar, FiSettings, FiFileText } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import LogoImg from '../assets/logos/logo_1-removebg-preview.png';
import SideBarLinks from '@/components/sideBar/SideBarLinksDentist';
import { Button } from '@/components/designSystem/button';
import { useAuth } from '@/hooks/Auth/useAuth';

const SideBarDentist = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { logout } = useAuth();

    return (
        <div className={`${isOpen ? "w-56 " : "w-20"} bg-white/70  max-h-screen overflow-y-auto z-50 min-h-screen flex flex-col justify-between transition-all duration-300 lg:relative absolute shadow-lg`}>
            <div className='flex justify-center flex-col items-center relative py-4'>
                <button
                    className={`absolute top-4 ${!isOpen ? "right-6" : "right-4"} bg-gray-100 p-1 rounded-full hover:bg-gray-200 transition-colors`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <MdMenuOpen size={20} className="text-gray-600" />
                    ) : (
                        <MdMenu size={20} className="text-gray-600" />
                    )}
                </button>

                {isOpen ? (
                    <>
                        <div className="flex flex-col items-center mb-4">
                            <img src={LogoImg} alt="logo" className='w-14 h-14 object-contain mb-' />
                            <h1 className='uppercase text-black font-semibold text-[18px]'>
                                <span className='text-[#3E7EA1]'>Dr</span> Chabani
                            </h1>
                        </div>
                        <SideBarLinks isOpen={isOpen} />
                    </>
                ) : (
                    <div className="flex flex-col items-center mt-8">
                        <img src={LogoImg} alt="logo" className='w-10 h-10 object-contain mb-6' />
                        <SideBarLinks isOpen={isOpen} />
                    </div>
                )}
            </div>

            {isOpen ? (
                <Button
                    className="flex items-center justify-center gap-2 text-white text-sm py-2 w-5/12 mb-6 mx-auto bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={logout}
                >
                    <MdLogout size={16} />
                    Logout
                </Button>
            ) : (
                <button
                    onClick={logout}
                    className="flex items-center justify-center mb-6 mx-auto p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                >
                    <MdLogout size={20} />
                </button>
            )}
        </div>
    );
};

export default SideBarDentist;