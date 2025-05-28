import React, { useState } from 'react';
import Model from "@/models/other/Model";
import { noteService } from '@/services/dentist/noteService';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { toast } from 'react-hot-toast';

const AddNoteModel = ({ isOpen, onClose, folderId, fetchFolderNotes, t }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleAdd() {
        if (!title.trim() || !content.trim()) return;
        const { data, error } = await noteService.addNote(folderId, title, content);

        if (data?.success) {
            toast.success(t("add_note_model.success_add"));
            fetchFolderNotes(folderId);
            onClose();
        } else {
            toast.error(error?.message || t("add_note_model.error_add"));
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-4 space-y-4">
                <h3 className="text-lg font-bold text-[#223354] mb-4">{t("add_note_model.title")}</h3>

                <Label htmlFor="title">{t("add_note_model.label_title")}</Label>
                <Input
                    id="title"
                    className={selectClassName}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("add_note_model.placeholder_title")}
                />

                <Label htmlFor="content">{t("add_note_model.label_content")}</Label>
                <Input
                    id="content"
                    className={selectClassName}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t("add_note_model.placeholder_content")}
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    {t("add_note_model.add_button")}
                </button>
            </div>
        </Model>
    );
};

export default AddNoteModel;
