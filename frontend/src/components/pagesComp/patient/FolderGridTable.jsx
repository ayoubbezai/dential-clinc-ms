import React from 'react'
import FolderIcon from "../../../assets/icons/folder2.svg";

const FolderGridTable = ({ folders }) => {
  return (
      <div className="grid grid-cols-4 gap-4 px-2 pb-2 max-h-[350px] overflow-y-auto">
          {folders?.map((folder, index) => (
              <div key={index} className="p-4 shadow-md rounded-lg bg-gray-100 hover:bg-gray-200 text-center">
                  <img src={FolderIcon} alt="folder" className='w-12 h-12 mx-auto' />
                  <p className="font-semibold mt-2">{folder.folder_name}</p>
                  <p className="text-sm">${folder.price}</p>
                  <p className="text-xs text-gray-500">{folder.status}</p>
              </div>
          ))}
      </div>
  )
}

export default FolderGridTable
