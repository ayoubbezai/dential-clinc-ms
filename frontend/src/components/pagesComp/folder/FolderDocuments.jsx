import { attachmentService } from "@/services/dentist/attachmentService";
import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";

const FolderDocuments = ({ folderId }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [documents, setDocuments] = useState([]); // Store fetched documents

    // Fetch documents when folderId changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await attachmentService.getAllAttchments(folderId);
                if (data?.success) {
                    console.log("Fetched Data:", data);
                    setDocuments(data?.data?.attachments); // Update state with fetched data
                }
            } catch (error) {
                console.error("Error fetching attachments:", error);
            }
        };

        if (folderId) fetchData();
    }, [folderId]); // Run effect when folderId changes

    async function handleStore() {
        if (!file || !title.trim()) {
            alert("Please select a file and enter a title.");
            return;
        }

        try {
            console.log("Uploading to folder:", folderId);
            console.log("Selected file:", file);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);

            await attachmentService.storeAttachment(folderId, formData);
            alert("File uploaded successfully!");
            setFile(null);
            setTitle("");

            // Refresh document list after upload

        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    }

    return (
        <div className="col-span-4 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title */}
            <h3 className="text-[#223354] font-bold text-lg pb-2 border-b mb-3">
                Documents
            </h3>

            {/* Documents List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {documents?.length > 0 ? (
                    documents.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50 cursor-pointer"
                        >
                            <AiOutlineFilePdf className="text-red-600 text-2xl" />
                            <span className="text-[#223354] font-medium text-[13px] truncate">
                                <a href={doc.download_url}>{doc?.title}</a>
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No documents found.</p>
                )}
            </div>

            {/* File Upload */}
            <div className="mt-4">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter document title"
                    className="mt-2 w-full p-2 border rounded-lg text-gray-700"
                />
                <button
                    onClick={handleStore}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Upload Document
                </button>
            </div>
        </div>
    );
};

export default FolderDocuments;
