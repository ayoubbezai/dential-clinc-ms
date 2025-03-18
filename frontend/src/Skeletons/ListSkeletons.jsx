import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListSkeletons = () => {
    return (
        <div className="w-2/3 mx-auto mt-10 mr-26">
            <Skeleton height={30} width="20%" baseColor="#E5E7EB" highlightColor="#F3F4F6" />
            <Skeleton height={20} width="50%" baseColor="#E5E7EB" highlightColor="#F3F4F6" className="mt-2" />
            <Skeleton height={65} width="100%" baseColor="#D1D5DB" highlightColor="#E5E7EB" className="mt-4" />
            <Skeleton height={35} width="100%" baseColor="#D1D5DB" highlightColor="#E5E7EB" className="mt-1" />
            <Skeleton height={50} width="100%" count={4} baseColor="#E5E7EB" highlightColor="#F3F4F6" className="mt-1" />
        </div>
    );
};

export default ListSkeletons;
