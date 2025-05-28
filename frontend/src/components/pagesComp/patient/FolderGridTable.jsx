import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import FolderIcon from '../../../assets/icons/folder2.svg';
import { FaEllipsisV } from 'react-icons/fa';

// Lazy load the EditFolderModel
const EditFolderModel = lazy(() => import('@/models/EditModels/EditFolderModel'));

const FolderGridTable = ({ loading, folders, handleDelete, isEditFolderOpen, setIsEditFolderOpen, refetchFolders, t }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(null);

    const handleMenu = (folder) => {
        setCurrentFolder(folder);
        setIsMenuOpen((prev) => (folder === currentFolder ? !prev : true));
    };

    const handleDeleteFolder = (id) => {
        handleDelete(id);
        refetchFolders();
        setIsMenuOpen(false);
    };

    const handleEditFolder = () => {
        setIsEditFolderOpen(true);
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-2 pb-2 max-h-[350px] overflow-y-auto">
                {folders?.map((folder, index) => (
                    <div key={index} className="p-4 shadow-md relative rounded-lg bg-gray-100 hover:bg-gray-200 text-center">
                        <button
                            className="p-2 absolute right-0 top-2 rounded-full hover:bg-gray-200"
                            onClick={() => handleMenu(folder)}
                            aria-label={t('folder.actions_menu')}
                        >
                            <FaEllipsisV className="text-gray-500" />
                        </button>

                        {(folder === currentFolder) && isMenuOpen && (
                            <div className="absolute right-6 w-40 bg-white shadow-lg rounded-lg z-50">
                                <button
                                    onClick={handleEditFolder}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    {t('folder.edit_folder')}
                                </button>
                                <button
                                    onClick={() => handleDeleteFolder(folder.id)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    {t('folder.delete_folder')}
                                </button>
                            </div>
                        )}

                        <Link to={`folder/${folder.id}`}>
                            <img src={FolderIcon} alt={t('folder.icon_alt')} className='w-12 h-12 mx-auto' />
                            <p className="font-semibold mt-2">{folder.folder_name}</p>
                        </Link>
                        <p className="text-sm">${folder.price}</p>
                        <p className="text-xs text-gray-500">{t(`status.${folder.status}`) || folder.status}</p>
                    </div>
                ))}
            </div>

            {/* Lazy Load Edit Folder Modal */}
            {isEditFolderOpen && currentFolder && (
                <Suspense fallback={<p>{t('loading')}</p>}>
                    <EditFolderModel
                        isOpen={isEditFolderOpen}
                        onClose={() => setIsEditFolderOpen(false)}
                        folder={currentFolder}
                        refetchFolders={refetchFolders}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderGridTable;
