import React from 'react'
import { Link } from 'react-router-dom'
import { sideBar } from '@/constant/sideBar';

const SideBarComp = ({ text }) => {
    return (
        <div className='w-full mt-3'>
            <hr className='w-full border-gray-300' />
            <h2 className='ml-3 font-semibold text-[13px] mt-0.5 text-gray-700'>{text}</h2>
        </div>
    );
};

const SideBarLinks = () => {
    return (
        <>
            <div>
                <Link to={"/dentist/dashboard"} className={`text-sm  ${location.pathname === "/dentist/dashboard" ? "text-blue-500" : ""} `} >Overview</Link>
            </div>
            <SideBarComp text={"Lists"} />
            {sideBar?.lists.map((list, index) => (
                <div key={index} className='my-2'>
                    <Link to={list.link} className={`text-sm  ${location.pathname === list.link ? "text-blue-500" : ""} `}>
                        {list.name}
                    </Link>
                </div>
            ))}
            <SideBarComp text={"Pages"} />
            {sideBar?.pages.map((page, index) => (
                <div key={index} className='my-2'>
                    <Link to={page.link} className={`text-sm  ${location.pathname === page.link ? "text-blue-500" : ""} `}>
                        {page.name}
                    </Link>
                </div>
            ))}
        </>
    )
}

export default SideBarLinks
