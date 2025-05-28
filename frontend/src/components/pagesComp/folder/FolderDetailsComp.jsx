import React, { useState, lazy, Suspense } from "react";
import Swal from "sweetalert2";
import { folderService } from "@/services/dentist/foldersService";
import ThreeDotsH from "@/components/small/ThreeDotsH";
import FolderDetailsMenu from "./FolderDetailsMenu";

const EditFolderModel = lazy(() => import("@/models/EditModels/EditFolderModel"));

const FolderDetailsComp = ({ folderDetails, fetchFolderDetails, t, tPatient }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);


    const handleDelete = async (folderId) => {
        const result = await Swal.fire({
            title: t("folder_details_comp.modal.delete_title"),
            text: t("folder_details_comp.modal.delete_text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: t("folder_details_comp.modal.delete_confirm"),
        });

        if (result.isConfirmed) {
            const response = await folderService.deleteFolder(folderId);

            if (response?.success) {
                Swal.fire(
                    t("folder_details_comp.modal.delete_success"),
                    t("folder_details_comp.modal.delete_success_message"),
                    "success"
                );
                fetchFolderDetails();
            } else {
                Swal.fire(
                    t("folder_details_comp.modal.delete_error"),
                    response?.message || t("folder_details_comp.modal.delete_error_message"),
                    "error"
                );
            }
        }
    };

    return (

        <div className="col-span-6 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm relative">
            {/* Header */}

            <div className="flex items-center border-b justify-between pb-3 mb-3">
                <h3 className="text-[#223354] font-bold text-lg">{t("folder_details_comp.title")}</h3>

            </div>
            <div className="flex items-center justify-between pb-2">
                <div>
                    <h3 className="text-[#223354] font-bold text-lg">
                        {folderDetails?.folder_name || "N/A"}
                    </h3>
                    <p className={`text-xs font-medium px-3 py-1 rounded-md mt-1 inline-block
                        ${folderDetails?.status === "working_on_it"
                            ? "text-green-600 bg-green-100"
                            : "text-amber-500 bg-amber-100"}`}>
                        {t(`folder_details_comp.status.${folderDetails?.status || "unknown"}`)}
                    </p>
                </div>

                {/* Menu Icon */}
                <div className="relative">
                    <ThreeDotsH isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    {isMenuOpen && (
                        <FolderDetailsMenu
                            onEdit={() => {
                                setIsMenuOpen(false);
                                setIsEditOpen(true);
                            }}
                            onDelete={() => {
                                setIsMenuOpen(false);
                                handleDelete(folderDetails.id);
                            }}
                            t={t}
                        />
                    )}
                </div>
            </div>

            {/* Visits List */}
            <div className="mt-4 max-h-52 overflow-y-auto space-y-3">
                {folderDetails?.visits?.length > 0 ? (
                    folderDetails.visits.map((visit, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                        >
                            <p className="text-gray-900 font-semibold">
                                {t("folder_details_comp.visit.tooth")}:{" "}
                                <span className="text-[#223354] font-normal">{visit?.dent || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                {t("folder_details_comp.visit.reason")}:{" "}
                                <span className="text-[#223354] font-normal">{visit?.reason_of_visit || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                {t("folder_details_comp.visit.treatment")}:{" "}
                                <span className="text-[#223354] font-normal">{visit?.treatment_details || "N/A"}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center bg-gray-100 p-3 rounded-md">
                        {t("folder_details_comp.visit.no_details")}
                    </p>
                )}
            </div>

            {/* Edit Modal */}
            {isEditOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <EditFolderModel
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        folder={folderDetails}
                        fetchFolderDetails={fetchFolderDetails}
                        t={tPatient}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default FolderDetailsComp;
