import React, { useEffect, useState, lazy, Suspense } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";

const AddDocumentModel = lazy(() => import("@/models/AddModels/AddDocumentModel"));

const FolderDocuments = ({ folderId, folderAttachments, fetchFolderAttachments }) => {
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(()=>(
        console.log(folderAttachments)
    ), [folderAttachments])




    return (
        <div className="col-span-4 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title & Menu */}
            <div className="flex justify-between items-center pb-2 border-b mb-3">
                <h3 className="text-[#223354] font-bold text-lg">Documents</h3>
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
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsAddModelOpen(true);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-[#1a75ff] hover:bg-gray-100"
                            >
                                + Add Document
                            </button>
                            <button
                                onClick={() => fetchFolderAttachments(folderId)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🔄 Refresh List
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Documents List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {folderAttachments?.length > 0 ? (
                    folderAttachments.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50 cursor-pointer"
                        >
                            <AiOutlineFilePdf className="text-red-600 text-2xl" />
                            <span className="text-[#223354] font-medium text-[13px] truncate">
                                <a href={doc.download_url} target="_blank" rel="noopener noreferrer">
                                    {doc?.title}
                                </a>
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No documents found.</p>
                )}
            </div>

            {/* Add Document Modal */}
            <Suspense fallback={<div>Loading...</div>}>
                {isAddModelOpen && (
                    <AddDocumentModel
                        isOpen={isAddModelOpen}
                        onClose={() => setIsAddModelOpen(false)}
                        folderId={folderId}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default FolderDocuments;
