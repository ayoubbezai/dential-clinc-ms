import React, { useState } from 'react';
import { MdMenu, MdMenuOpen } from "react-icons/md";
import LogoImg from '../assets/logos/logo_1-removebg-preview.png';
import SideBarLinks from '@/components/common/SideBarLinks';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`${isOpen ? "w-56 lg:bg-white bg-white/95" : "w-8"} z-50 min-h-screen transition-all duration-300 lg:relative absolute`}>
            <div className='flex justify-center flex-col items-center relative'>
                <button
                    className={`absolute top-2 ${!isOpen ? "-right-1" : "right-2"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MdMenuOpen
                        size={24}
                        className={`transform transition-all duration-300 ${!isOpen ? "translate-x-1 rotate-180" : "translate-x-0"}`}
                    />
                </button>
                {isOpen && (
                    <>
                        <h1 className='uppercase text-black font-semibold text-lg mt-3 mb-2'>
                            <span className='text-[#3E7EA1]'>Dr</span> Chabani
                        </h1>
                        <img src={LogoImg} alt="logo" className='w-20 mb-2' />
                        <SideBarLinks />
                    </>
                )}
            </div>
        </div>
    );
};

export default SideBar;
