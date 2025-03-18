import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SceduleSkeleton = () => {
    return (
        <div className="w-2/3 mx-auto mt-10 mr-26">
            <Skeleton height={35} width={'12%'} baseColor="#D1D5DB" highlightColor="#E5E7EB" className='mr-1 bg-gray-300' />
            <Skeleton height={75} width={'100%'} baseColor="#E5E7EB" highlightColor="#F3F4F6" className='mt-4' />
            <Skeleton height={60} width={'100%'} count={6} className='mt-2' />
        </div>
    )
}

export default SceduleSkeleton