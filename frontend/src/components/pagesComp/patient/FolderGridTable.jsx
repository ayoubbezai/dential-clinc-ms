import React, { useState } from 'react'
import FolderIcon from "../../../assets/icons/folder2.svg";
import { FaEllipsisV } from 'react-icons/fa';
import EditFolderModel from '@/models/EditModels/EditFolderModel';

const FolderGridTable = ({ loading, folders, handleDelete, isEditFolderOpen, setIsEditFolderOpen, refetchFolders }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentFolder, setCurrentFolder] = useState();
    const handleMenu = (folder) => {
        setCurrentFolder(folder);
        if ((folder === currentFolder) && isMenuOpen) {
            setIsMenuOpen(false);
        } else {

            setIsMenuOpen(true);
        }
    }

    const handleDelteFolder = (id) => {
        handleDelete(id);
        refetchFolders();
        setIsMenuOpen(false);

    }

    const handleEditFolder = () => {
        setIsEditFolderOpen(true);
        setIsMenuOpen(false)
    }
    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-2 pb-2 max-h-[350px] overflow-y-auto">
                {folders?.map((folder, index) => (
                    <div key={index} className="p-4 shadow-md relative rounded-lg bg-gray-100 hover:bg-gray-200 text-center">
                        <button className="p-2 absolute right-0 top-2 rounded-full hover:bg-gray-200" onClick={() => handleMenu(folder)}>
                            <FaEllipsisV className="text-gray-500" />
                        </button>
                        {(folder === currentFolder) && isMenuOpen && (
                            <div className="absolute right-6  w-40 bg-white shadow-lg rounded-lg z-50">
                                <button onClick={handleEditFolder} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Edit Folder
                                </button>
                                <button onClick={() => handleDelteFolder(folder.id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Delete Folder
                                </button>

                            </div>
                        )}
                        <img src={FolderIcon} alt="folder" className='w-12 h-12 mx-auto' />
                        <p className="font-semibold mt-2">{folder.folder_name}</p>
                        <p className="text-sm">${folder.price}</p>
                        <p className="text-xs text-gray-500">{folder.status}</p>
                    </div>
                ))}
            </div>
            {isEditFolderOpen && currentFolder && (
                <EditFolderModel
                    isOpen={isEditFolderOpen}
                    onClose={() => setIsEditFolderOpen(false)}
                    folder={currentFolder}
                    refetchFolders={refetchFolders}
                />
            )}
        </>
    )
}

export default FolderGridTable
