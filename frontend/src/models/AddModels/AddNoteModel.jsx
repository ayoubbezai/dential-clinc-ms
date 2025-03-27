import React, { useState } from 'react';
import Model from "@/models/other/Model";
import { noteService } from '@/services/dentist/noteService';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { toast } from 'react-hot-toast';

const AddNoteModel = ({ isOpen, onClose, folderId, fetchFolderNotes  }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleAdd() {
        if (!title.trim() || !content.trim()) return;
        const { data, error } = await noteService.addNote(folderId, title, content);

        if (data?.success) {
            toast.success("Note added successfully!");
            fetchFolderNotes(folderId);
            onClose(); 
        } else {
            toast.error(error?.message);
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-4 space-y-4">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    className={selectClassName}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                />

                <Label htmlFor="content">Content</Label>
                <Input
                    id="content"
                    className={selectClassName}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Note
                </button>
            </div>
        </Model>
    );
};

export default AddNoteModel;
