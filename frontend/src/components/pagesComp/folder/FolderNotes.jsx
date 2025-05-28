import React, { useState, lazy, Suspense } from "react";
import FolderNotesMenu from "./FolderNotesMenu";
import ThreeDotsV from "@/components/small/ThreeDotsV";

const AddNoteModel = lazy(() => import("@/models/AddModels/AddNoteModel"));
const EditNoteModel = lazy(() => import("@/models/EditModels/EditNoteModel"));

const FolderNotes = ({ folderNotes, folderId, fetchFolderNotes, t }) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="col-span-6 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
                {/* Header */}
                <div className="flex items-center border-b justify-between pb-3 mb-3">
                    <h3 className="text-[#223354] font-bold text-lg">{t("folder_notes.title")}</h3>
                    <div className="relative">
                        <ThreeDotsV isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                        {isMenuOpen && (
                            <FolderNotesMenu
                                setIsMenuOpen={setIsMenuOpen}
                                setIsAddModelOpen={setIsAddModelOpen}
                                setIsEditModelOpen={setIsEditModelOpen}
                                t={t}
                            />
                        )}
                    </div>
                </div>

                {/* Notes List */}
                <div className="max-h-44 overflow-y-auto space-y-3">
                    {folderNotes?.length > 0 ? (
                        folderNotes.map((note, index) => (
                            <div key={index} className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm">
                                <p className="text-gray-800 font-semibold">
                                    {t("folder_notes.note.title")}:{" "}
                                    <span className="text-[#223354] font-normal">
                                        {note?.title || t("folder_notes.note.untitled")}
                                    </span>
                                </p>
                                <p className="text-gray-800 font-medium">
                                    {t("folder_notes.note.content")}:{" "}
                                    <span className="text-gray-600 font-normal">
                                        {note?.content || t("folder_notes.note.no_content")}
                                    </span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">{t("folder_notes.no_notes")}</p>
                    )}
                </div>
            </div>

            {/* Add Note Modal */}
            {isAddModelOpen && (
                <Suspense fallback={<div>{t("loading")}</div>}>
                    <AddNoteModel
                        isOpen={isAddModelOpen}
                        onClose={() => setIsAddModelOpen(false)}
                        folderId={folderId}
                        fetchFolderNotes={fetchFolderNotes}
                        t={t}
                    />
                </Suspense>
            )}

            {/* Edit Note Modal */}
            {isEditModelOpen && (
                <Suspense fallback={<div>{t("loading")}</div>}>
                    <EditNoteModel
                        isOpen={isEditModelOpen}
                        onClose={() => setIsEditModelOpen(false)}
                        folderNotes={folderNotes}
                        fetchFolderNotes={fetchFolderNotes}
                        folderId={folderId}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderNotes;
