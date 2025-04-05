import React from 'react';

const ModelNoClickOut = ({ isOpen, onClose, children }) => {



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500/20 flex items-center justify-center z-50">
            <div  className="bg-white rounded-lg shadow-lg pt-3 w-full max-w-md relative">
                <button
                    className="absolute top-1 right-4 cursor-pointer text-[28px] text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModelNoClickOut;
