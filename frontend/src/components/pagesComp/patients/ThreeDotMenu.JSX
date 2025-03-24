import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ThreeDotMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Three Dots Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200"
            >
                <BsThreeDotsVertical size={20} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
                    <button
                        onClick={() => alert("Add Account Clicked")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        Add Account
                    </button>
                    <button
                        onClick={() => alert("Edit Clicked")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
