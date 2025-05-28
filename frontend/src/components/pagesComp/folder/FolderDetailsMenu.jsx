import React from 'react';

const FolderDetailsMenu = ({ onEdit, onDelete, t }) => {
    return (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md border border-gray-200 z-10">
            <button
                onClick={onEdit}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                {t("Edit")}
            </button>
            <button
                onClick={onDelete}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
                {t("Delete")}
            </button>
        </div>
    );
};

export default FolderDetailsMenu;
