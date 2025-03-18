import React from "react";

const SideBarSkeleton = () => {
    return (
        <div className="w-56 min-h-screen bg-gray-200 p-4 flex flex-col items-center animate-pulse">
            {/* Sidebar Header Skeleton */}
            <div className="w-32 h-6 bg-gray-300 rounded-lg mb-4"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-6"></div>

            {/* Sidebar Links Skeleton */}
            <div className="w-40 h-7 bg-gray-300 rounded-lg mb-6"></div>
            <div className="w-40 h-7 bg-gray-300 rounded-lg mb-6"></div>
            <div className="w-40 h-7 bg-gray-300 rounded-lg mb-6"></div>
            <div className="w-40 h-7 bg-gray-300 rounded-lg mb-6"></div>
            <div className="w-40 h-7 bg-gray-300 rounded-lg mb-6"></div>
        </div>
    );
};

export default SideBarSkeleton;
