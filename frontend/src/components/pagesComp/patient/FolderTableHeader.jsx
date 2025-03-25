import React, { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/designSystem/button';
import { FaTh, FaList, FaPlus } from 'react-icons/fa';
import SearchInTable from '@/components/small/SearchInTable';

const AddFolderModel = lazy(() => import("@/models/AddModels/AddFolderModel"))


const FolderTableHeader = ({ view, setView, id, search, setSearch, refetchFolders }) => {
    const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

    return (
        <>
            <div className='flex items-center justify-between pb-0 px-2'>
                <SearchInTable search={search} setSearch={setSearch} />
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
            {isAddFolderOpen && (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddFolderModel
                        isOpen={isAddFolderOpen}
                        onClose={() => setIsAddFolderOpen(false)}
                        patientId={id}
                        refetchFolders={refetchFolders}
                    />
                </Suspense>
            )}
        </>
    )
}

export default FolderTableHeader
