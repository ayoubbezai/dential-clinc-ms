import React, { useState, lazy, Suspense } from "react";
import { FaEllipsisV } from "react-icons/fa";
import FolderNotesMenu from "./FolderNotesMenu";
import ThreeDotsV from "@/components/small/ThreeDotsV";

const AddNoteModel = lazy(() => import("@/models/AddModels/AddNoteModel"));
const EditNoteModel = lazy(() => import("@/models/EditModels/EditNoteModel"));

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
                        <ThreeDotsV isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                        {isMenuOpen && (
                        
                            < FolderNotesMenu setIsMenuOpen={setIsMenuOpen} setIsAddModelOpen={setIsAddModelOpen} setIsEditModelOpen={setIsEditModelOpen} />

                        )}
                    </div>
                </div>

                {/* Notes List */}
                <div className="max-h-60 overflow-y-auto space-y-3">
                    {folderNotes?.length > 0 ? (
                        folderNotes.map((note, index) => (
                            <div key={index} className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm">
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

            {/* Add Note Model */}
            {isAddModelOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <AddNoteModel
                        isOpen={isAddModelOpen}
                        onClose={() => setIsAddModelOpen(false)}
                        folderId={folderId}
                        fetchFolderNotes={fetchFolderNotes}
                    />
                </Suspense>
            )}

            {/* Edit Notes Model (Bulk Edit & Delete) */}
            {isEditModelOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <EditNoteModel
                        isOpen={isEditModelOpen}
                        onClose={() => setIsEditModelOpen(false)}
                        folderNotes={folderNotes}
                        fetchFolderNotes={fetchFolderNotes}
                        folderId={folderId}

                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderNotes;
