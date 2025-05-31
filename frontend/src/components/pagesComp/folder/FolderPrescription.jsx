import React, { useState, lazy, Suspense } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import ThreeDotsV from "@/components/small/ThreeDotsV";
import FolderPrescriptionMenu from "./FolderPrescriptionMenu.jsx";
import toast from "react-hot-toast";
import { attachmentService } from "@/services/dentist/attachmentService";

const AddPrescriptionModel = lazy(() => import("@/models/AddModels/AddPrescriptionModel"));

const FolderPrescription = ({ patient, folderId, folderAttachments, fetchFolderAttachments }) => {
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Delete handler similar to FolderDocuments example
    async function handleDelete(attachmentId) {
        try {
            const data = await attachmentService.deleteAttachments(attachmentId);
            if (data.success) {
                toast.success("Prescription deleted successfully.");
                fetchFolderAttachments(folderId); // Refresh list after deletion
            } else {
                toast.error("Failed to delete prescription.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting prescription.");
            console.error("Delete Error:", error);
        }
    }

    return (
        <div className="col-span-4 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title & Menu */}
            <div className="flex justify-between items-center pb-2 border-b mb-3">
                <h3 className="text-[#223354] font-bold text-lg">Prescription Details</h3>
                <div className="relative">
                    <ThreeDotsV isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    {isMenuOpen && (
                        <FolderPrescriptionMenu
                            setIsMenuOpen={setIsMenuOpen}
                            setIsAddModelOpen={setIsAddModelOpen}
                        />
                    )}
                </div>
            </div>

            {/* Prescriptions List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {folderAttachments?.length > 0 ? (
                    folderAttachments
                        .filter((att) => att.type === "prescription")
                        .map((presc, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                            >
                                <div className="flex items-center gap-3">
                                    <AiOutlineFilePdf className="text-red-500 text-2xl" />
                                    <div className="flex flex-col">
                                        <a
                                            href={presc.download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#223354] font-medium text-[13px] truncate"
                                        >
                                            {presc?.title || "Unknown title"}
                                        </a>
                                        <span className="text-xs text-gray-500">{presc.created_at?.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={presc.download_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500/50 hover:text-blue-500/80 hover:cursor-pointer text-sm"
                                        aria-label="View prescription"
                                    >
                                        View
                                    </a>
                                    <a
                                        href={presc.download_url}
                                        download={`Prescription_${presc.patient?.patient_name || "Unknown"}_${presc.created_at?.slice(0, 10)}.pdf`}
                                        className="text-gray-500/50 hover:text-gray-500/80 hover:cursor-pointer text-sm"
                                        aria-label="Download prescription"
                                    >
                                        Download
                                    </a>
                                    <button
                                        onClick={() => handleDelete(presc.id)}
                                        className="text-red-500/50 hover:text-red-500/80 hover:cursor-pointer text-sm"
                                        aria-label="Delete prescription"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-gray-500 text-center">No prescriptions available</p>
                )}
            </div>

            {/* Add Prescription Modal */}
            <Suspense fallback={<div>Loading...</div>}>
                {isAddModelOpen && (
                    <AddPrescriptionModel
                        isOpen={isAddModelOpen}
                        onClose={() => setIsAddModelOpen(false)}
                        patient={patient}
                        folderId={folderId}
                        fetchFolderAttachments={fetchFolderAttachments} // to refresh list after add
                    />
                )}
            </Suspense>
        </div>
    );
};

export default FolderPrescription;
