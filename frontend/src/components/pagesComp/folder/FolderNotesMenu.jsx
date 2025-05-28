import React from 'react';

const FolderNotesMenu = ({ setIsMenuOpen, setIsAddModelOpen, setIsEditModelOpen, t }) => {
    return (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-10">
            <button
                onClick={() => { setIsMenuOpen(false); setIsEditModelOpen(true); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                {t("folder_notes_menu.manage_notes")}
            </button>
            <button
                onClick={() => { setIsMenuOpen(false); setIsAddModelOpen(true); }}
                className="block w-full text-left px-4 py-2 text-sm text-[#1a75ff] hover:bg-gray-100"
            >
                + {t("folder_notes_menu.add_note")}
            </button>
        </div>
    );
};

export default FolderNotesMenu;
