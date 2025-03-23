import React from 'react'
import { X } from 'lucide-react'
const CloseButton = ({ handleClose }) => {
  return (
      <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 transition"
      >
          <X size={16} />
      </button>
  )
}

export default CloseButton
