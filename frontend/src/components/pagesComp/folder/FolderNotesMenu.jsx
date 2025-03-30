import React from 'react'

const FolderNotesMenu = ({ setIsMenuOpen, setIsAddModelOpen, setIsEditModelOpen }) => {
  return (
      <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-10">
          <button
              onClick={() => { setIsMenuOpen(false); setIsEditModelOpen(true); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
              Manage Notes
          </button>
          <button
              onClick={() => { setIsMenuOpen(false); setIsAddModelOpen(true); }}
              className="block w-full text-left px-4 py-2 text-sm text-[#1a75ff] hover:bg-gray-100"
          >
              + Add Note
          </button>
      </div>
  )
}

export default FolderNotesMenu
