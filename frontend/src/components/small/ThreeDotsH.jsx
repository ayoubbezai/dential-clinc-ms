import React from 'react'
import { FaEllipsisH } from 'react-icons/fa'

const ThreeDotsH = ({ isMenuOpen ,setIsMenuOpen}) => {
  return (
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-700 p-2">
          <FaEllipsisH />
      </button>
  )
}

export default ThreeDotsH
