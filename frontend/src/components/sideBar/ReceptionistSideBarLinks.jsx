import React from 'react'
import { Link } from 'react-router-dom'
import { sideBarReceptionist } from '@/constant/sideBarReceptionist';

const SideBarComp = ({ text }) => {
    return (
        <div className='w-full mt-2'>
            <hr className='w-full border-gray-300' />
            <h2 className='ml-3 font-semibold text-[12px] mt-0.5 text-gray-700'>{text}</h2>
        </div>
    );
};

const ReceptionistSideBarLinks = () => {
    return (
        <>
            <SideBarComp text={"Lists"} />
            {sideBarReceptionist?.lists.map((list, index) => (
                <div key={index} className='my-[5px]'>
                    <Link to={list.link} className={`text-[13px]  ${location.pathname === list.link ? "text-blue-500" : ""} `}>
                        {list.name}
                    </Link>
                </div>
            ))}
            <SideBarComp text={"Pages"} />
            {sideBarReceptionist?.pages.map((page, index) => (
                <div key={index} className='my-[5px]'>
                    <Link to={page.link} className={`text-[13px]  ${location.pathname === page.link   ? "text-blue-500" : ""} `}>
                        {page.name}
                    </Link>
                </div>
            ))}
        </>
    )
}


export default ReceptionistSideBarLinks
