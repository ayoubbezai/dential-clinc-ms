import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Model from "@/models/other/Model";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { noteService } from '@/services/dentist/noteService';

const EditNoteModel = ({ isOpen, onClose, folderNotes, fetchFolderNotes, folderId, t }) => {
    const [editedNotes, setEditedNotes] = useState({});

    // Handle content change
    const handleContentChange = (noteId, newContent) => {
        setEditedNotes((prev) => ({
            ...prev,
            [noteId]: newContent
        }));
    };

    const submitChanges = async () => {
        const updates = Object.entries(editedNotes);
        if (updates.length === 0) return;

        try {
            await Promise.all(
                updates.map(async ([noteId, newContent]) => {
                    await noteService.editNote(noteId, newContent);
                })
            );
            toast.success(t("edit_note_model.success_update"));
            fetchFolderNotes(folderId);
            setEditedNotes({});
        } catch (error) {
            toast.error(t("edit_note_model.error_update"));
            console.error("Failed to update notes:", error);
        }
    };

    const handleDelete = async (noteId) => {
        try {
            const data = await noteService.deleteNote(noteId);
            if (data.success) {
                toast.success(t("edit_note_model.success_delete"));
                fetchFolderNotes(folderId);
            } else {
                toast.error(t("edit_note_model.error_delete"));
            }
        } catch (error) {
            toast.error(t("edit_note_model.error_delete_generic"));
            console.error("Delete Error:", error);
        }
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <>
                <div className="max-h-[80vh] overflow-y-auto p-5 pt-2">
                    <h3 className="text-lg font-bold text-[#223354] mb-5">{t("edit_note_model.title")}</h3>

                    <div className="space-y-4">
                        {folderNotes.map((note) => (
                            <div key={note.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50/50 transition hover:shadow-lg">
                                <p className="text-md font-semibold text-gray-800 mb-2">{note.title}</p>
                                <textarea
                                    value={editedNotes[note.id] ?? note.content}
                                    onChange={(e) => handleContentChange(note.id, e.target.value)}
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="text-red-500/80 hover:text-red-500/90 cursor-pointer transition flex items-center space-x-1"
                                    >
                                        <IoRemoveCircleOutline size={20} />
                                        <span className="text-sm">{t("edit_note_model.remove")}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save & Cancel Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                        onClick={onClose}
                    >
                        {t("edit_note_model.cancel")}
                    </button>
                    <button
                        className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                        onClick={submitChanges}
                    >
                        {t("edit_note_model.save_changes")}
                    </button>
                </div>
            </>
        </Model>
    );
};

export default EditNoteModel;
