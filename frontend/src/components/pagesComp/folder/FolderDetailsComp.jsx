import React, { useState, lazy, Suspense } from "react";
import { FaEllipsisH } from "react-icons/fa";
import Swal from "sweetalert2";
import { folderService } from "@/services/dentist/foldersService";
import ThreeDotsH from "@/components/small/ThreeDotsH";
import FolderDetailsMenu from "./FolderDetailsMenu";

const EditFolderModel = lazy(() => import("@/models/EditModels/EditFolderModel"));

const FolderDetailsComp = ({ folderDetails, fetchFolderDetails }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleDelete = async (folderId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const response = await folderService.deleteFolder(folderId);

            if (response?.success) {
                Swal.fire("Deleted!", "Your folder has been removed.", "success");
                fetchFolderDetails();
            } else {
                Swal.fire("Error", response?.message || "Failed to delete folder.", "error");
            }
        }
    };

    return (
        <div className="col-span-6 bg-white p-5  shadow-md rounded-lg border border-gray-200 text-sm relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 ">
                <div>
                    <h3 className="text-[#223354] font-bold text-lg">{folderDetails?.folder_name || "N/A"}</h3>
                    <p className={`text-xs font-medium px-3 py-1 rounded-md mt-1 inline-block 
                        ${folderDetails?.status === "working_on_it" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                        {folderDetails?.status || "Unknown"}
                    </p>
                </div>

                {/* Menu Icon */}
                <div className="relative">
                    <ThreeDotsH isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <FolderDetailsMenu onEdit={() => { setIsMenuOpen(false); setIsEditOpen(true); }} onDelete={() => { setIsMenuOpen(false); handleDelete(folderDetails.id); }} />

                    )}
                </div>
            </div>

            {/* Visits List */}
            <div className="mt-4 max-h-52 overflow-y-auto space-y-3">
                {folderDetails?.visits?.length > 0 ? (
                    folderDetails.visits.map((folder, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                        >
                            <p className="text-gray-900 font-semibold">
                                Tooth No.: <span className="text-[#223354] font-normal">{folder?.dent || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                Reason: <span className="text-[#223354] font-normal">{folder?.reason_of_visit || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                Treatment: <span className="text-[#223354] font-normal">{folder?.treatment_details || "N/A"}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center bg-gray-100 p-3 rounded-md">No tooth details available.</p>
                )}
            </div>

            {isEditOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <EditFolderModel
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        folder={folderDetails}
                        fetchFolderDetails={fetchFolderDetails}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default FolderDetailsComp;
