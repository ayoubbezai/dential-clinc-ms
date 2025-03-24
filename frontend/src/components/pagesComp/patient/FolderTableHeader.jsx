import React, { useState } from 'react'
import { Button } from '@/components/designSystem/button';
import { FaTh, FaList, FaPlus} from 'react-icons/fa';
import AddFolderModel from '@/models/AddModels/AddFolderModel';
import SearchInTable from '@/components/small/SearchInTable';
const FolderTableHeader = ({view,setView ,id}) => {
    const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between pb-0 px-2'>
          <SearchInTable />
          <div className='flex items-center gap-2'>
              <div className="flex rounded-lg p-1 transition-all duration-300">
                  <button className={`px-4 py-2 rounded-l-lg transition-colors duration-300 ${view === "list" ? "bg-blue-600/90 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setView("list")}>
                      <FaList />
                  </button>
                  <button className={`px-4 py-2 rounded-r-lg transition-colors duration-300 ${view === "grid" ? "bg-blue-600/90 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setView("grid")}>
                      <FaTh />
                  </button>
              </div>
              <Button size={"sm"} className="bg-blue-600 text-white mx-2 rounded-lg" onClick={() => setIsAddFolderOpen(true)}><FaPlus size={12} /></Button>
          </div>
      </div>
          <AddFolderModel isOpen={isAddFolderOpen} onClose={() => setIsAddFolderOpen(false)} patientId={id} />

    </>
  )
}

export default FolderTableHeader
