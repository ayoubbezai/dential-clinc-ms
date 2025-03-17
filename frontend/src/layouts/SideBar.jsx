import React, { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom'
import LogoImg from '../assets/logos/logo_1-removebg-preview.png'
import { sideBar } from '@/constant/sideBar';

const SideBarComp = ({ text }) => {
    return (
        <div className='w-full mt-3'>
            <hr className='w-full border-gray-300' />
            <h2 className='ml-3 font-semibold text-[13px] mt-0.5 text-gray-700'>{text}</h2>
        </div>
    );
};



const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`${isOpen ? "w-56 lg:bg-white bg-white/95" : "w-8"} z-50  min-h-screen transition-all duration-300 lg:relative absolute `}>
            <div className='flex justify-center flex-col items-center relative'>
                <button className='absolute top-2 right-2 ' onClick={() => setIsOpen(!isOpen)}>
                    <MdMenu size={24} />
                </button>
                {isOpen && (
                    <>
                        <h1 className='uppercase text-black font-semibold text-lg my-4'>
                            <span className='text-[#3E7EA1]'>Dr</span> chabani
                        </h1>
                        <img src={LogoImg} alt="logo" className='w-20 mb-3' />
                        <div>
                            <Link to={"/dentist/dashboard"} className='text-sm'>Overview</Link>
                        </div>
                        <SideBarComp text={"Lists"} />
                        {sideBar?.lists.map((list, index) => (
                            <div key={index} className='my-2'>
                                <Link to={list.link} className='text-sm'>
                                    {list.name}
                                </Link>
                            </div>
                        ))}
                        <SideBarComp text={"Pages"} />
                        {sideBar?.pages.map((page, index) => (
                            <div key={index} className='my-2'>
                                <Link to={page.link} className='text-sm'>
                                    {page.name}
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>

    )
}

export default SideBar;
