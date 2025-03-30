import React from 'react'

const FolderDocumentsMenu = ({ setIsMenuOpen, setIsAddModelOpen, onRefresh }) => {
  return (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-10">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsAddModelOpen(true);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-[#1a75ff] hover:bg-gray-100"
                            >
                                + Add Document
                            </button>
                            <button
                                onClick={onRefresh}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🔄 Refresh List
                            </button>
                        </div>
  )
}

export default FolderDocumentsMenu
