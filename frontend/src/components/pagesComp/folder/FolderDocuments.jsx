import { attachmentService } from "@/services/dentist/attachmentService";
import React, { useState, lazy, Suspense } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import ThreeDotsV from "@/components/small/ThreeDotsV";
import FolderDocumentsMenu from "./FolderDocumentsMenu";

const AddDocumentModel = lazy(() => import("@/models/AddModels/AddDocumentModel"));

const FolderDocuments = ({ folderId, folderAttachments, fetchFolderAttachments, t }) => {
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    async function handleDelete(attachments_id) {
        try {
            const data = await attachmentService.deleteAttachments(attachments_id);
            if (data.success) {
                toast.success(t("folder_documents.success_delete"));
                fetchFolderAttachments(folderId);
            } else {
                toast.error(t("folder_documents.error_delete"));
            }
        } catch (error) {
            toast.error(t("folder_documents.error_delete_generic"));
            console.error("Delete Error:", error);
        }
    }

    return (
        <div className="col-span-4 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title & Menu */}
            <div className="flex justify-between items-center pb-2 border-b mb-3">
                <h3 className="text-[#223354] font-bold text-lg">{t("folder_documents.title")}</h3>
                <div className="relative">
                    <ThreeDotsV isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    {isMenuOpen && (
                        <FolderDocumentsMenu
                            setIsMenuOpen={setIsMenuOpen}
                            setIsAddModelOpen={setIsAddModelOpen}
                            onRefresh={() => fetchFolderAttachments(folderId)}
                            t={t}
                        />
                    )}
                </div>
            </div>

            {/* Documents List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {folderAttachments?.length > 0 ? (
                    folderAttachments.map((doc, index) => {
                        if (doc?.type !== "document") return null;
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                            >
                                <div className="flex items-center gap-3">
                                    <AiOutlineFilePdf className="text-red-500 text-2xl" />
                                    <div className="flex flex-col">
                                        <a
                                            href={doc.download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#223354] font-medium text-[13px] truncate"
                                        >
                                            {doc?.title}
                                        </a>
                                        <span className="text-xs text-gray-500">{doc.size}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="text-red-500/50 hover:text-red-500/80 hover:cursor-pointer text-sm"
                                    aria-label={t("folder_documents.delete_button_aria")}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center">{t("folder_documents.no_documents")}</p>
                )}
            </div>

            {/* Add Document Modal */}
            <Suspense fallback={<div>{t("loading")}</div>}>
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
