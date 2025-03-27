import React, { useState, lazy, Suspense } from "react";
import { FaEllipsisV } from "react-icons/fa";

const AddNoteModel = lazy(() => import("@/models/AddModels/AddNoteModel"));

const FolderNotes = ({ folderNotes, folderId, fetchFolderNotes }) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="col-span-6 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
                {/* Title */}
                <div className="flex items-center border-b justify-between pb-3 mb-3">
                    <h3 className="text-[#223354] font-bold text-lg">Notes</h3>
                    <div className="relative">
                        <button
                            className="text-gray-500 hover:text-gray-700 p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaEllipsisV />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-10">
                                <button
                                    onClick={() => { setIsMenuOpen(false); setIsEditModelOpen(true); }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit Notes
                                </button>
                                <button
                                    onClick={() => { setIsMenuOpen(false); setIsAddModelOpen(true); }}
                                    className="block w-full text-left px-4 py-2 text-sm text-[#1a75ff] hover:bg-gray-100"
                                >
                                    + Add Note
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Notes List */}
                <div className="max-h-60 overflow-y-auto space-y-3">
                    {folderNotes?.length > 0 ? (
                        folderNotes.map((note, index) => (
                            <div
                                key={index}
                                className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                            >
                                <p className="text-gray-800 font-semibold">
                                    Title: <span className="text-[#223354] font-normal">{note?.title || "Untitled"}</span>
                                </p>
                                <p className="text-gray-800 font-medium">
                                    Content: <span className="text-gray-600 font-normal">{note?.content || "No content available"}</span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No notes available.</p>
                    )}
                </div>
            </div>
            {/* Suspense for Lazy Loaded AddNoteModel */}
            {isAddModelOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <AddNoteModel isOpen={isAddModelOpen} onClose={() => setIsAddModelOpen(false)} folderId={folderId}
                        fetchFolderNotes={fetchFolderNotes}
                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderNotes;
