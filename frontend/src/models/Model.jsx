import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg bg-gray-500/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

export default Modal;