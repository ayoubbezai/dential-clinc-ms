import React from 'react'
import { FaEllipsisV } from "react-icons/fa";


const ThreeDotsV = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <button
            className="text-gray-500 hover:text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <FaEllipsisV />
        </button>
    )
}

export default ThreeDotsV
