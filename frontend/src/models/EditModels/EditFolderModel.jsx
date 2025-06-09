import React, { useState, useEffect } from "react";
import Model from "@/models/other/Model";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Input } from "@/components/designSystem/input";
import { selectClassName } from "@/constant/classNames";
import { folderService } from "@/services/dentist/foldersService";
import toast from "react-hot-toast";

const EditFolderModel = ({ isOpen, onClose, folder, fetchFolderDetails, t }) => {
    const [formData, setFormData] = useState({ folder_name: "", price: "", status: "" });
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(false);

    // Visit reasons in English (translated from French)
    const visitReasons = [
        { value: "prosthesis", label: "Prosthesis" },
        { value: "odontology", label: "Odontology" },
        { value: "orthodontics", label: "Orthodontics" },
        { value: "care", label: "Care" },
        { value: "occlusion_correction", label: "Occlusion Correction" }
    ];

    useEffect(() => {
        if (folder) {
            setFormData({
                folder_name: folder.folder_name || "",
                price: folder.price || "",
                status: folder.status || "",
            });
            setVisits(folder.visits || []);
        }
    }, [folder]);

    const handleVisitChange = (index, field, value) => {
        const updatedVisits = [...visits];
        updatedVisits[index][field] = value;
        setVisits(updatedVisits);
    };

    const addVisit = () => {
        setVisits([...visits, { dent: "", reason_of_visit: "", treatment_details: "" }]);
    };

    const removeVisit = (index) => {
        setVisits(visits.filter((_, i) => i !== index));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.folder_name || !formData.price || !formData.status) {
            toast.error(t("folder.fill_all_required_fields"));
            return;
        }

        setLoading(true);
        try {
            const { data } = await folderService.editFolder(folder.id, formData, visits);

            if (data?.success) {
                toast.success(t("folder.updated_successfully"));
                fetchFolderDetails();
                onClose();
            } else {
                toast.error(data?.message || t("folder.failed_to_update"));
            }
        } catch {
            toast.error(t("folder.failed_to_update"));
        }
        setLoading(false);
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold mb-2 ml-4">{t("folder.edit_folder")}</h2>
            <form className="space-y-4 p-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder={t("folder.folder_name")}
                        value={formData.folder_name}
                        onChange={(e) => setFormData({ ...formData, folder_name: e.target.value })}
                        className={selectClassName}
                    />
                    <Input
                        type="number"
                        placeholder={t("folder.price")}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className={selectClassName}
                    />
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className={selectClassName}
                    >
                        <option value="">{t("folder.select_status")}</option>
                        <option value="pending">{t("status.pending")}</option>
                        <option value="completed">{t("status.completed")}</option>
                        <option value="working_on_it">{t("status.working_on_it")}</option>
                    </select>
                </div>

                {/* Visits Section */}
                {visits.map((visit, index) => (
                    <div
                        key={index}
                        className="flex gap-2 items-center border-gray-200 border p-2 rounded-md bg-gray-50/50"
                    >
                        <Input
                            type="text"
                            placeholder={t("visit.dent")}
                            value={visit.dent}
                            onChange={(e) => handleVisitChange(index, "dent", e.target.value)}
                            className={selectClassName}
                        />
                        <select
                            value={visit.reason_of_visit}
                            onChange={(e) => handleVisitChange(index, "reason_of_visit", e.target.value)}
                            className={selectClassName}
                        >
                            <option value="">{t("visit.select_reason")}</option>
                            {visitReasons.map((reason) => (
                                <option key={reason.value} value={reason.value}>
                                    {reason.label}
                                </option>
                            ))}
                        </select>
                        <Input
                            type="text"
                            placeholder={t("visit.treatment")}
                            value={visit.treatment_details}
                            onChange={(e) => handleVisitChange(index, "treatment_details", e.target.value)}
                            className={selectClassName}
                        />
                        <button type="button" onClick={() => removeVisit(index)} className="text-red-500 text-lg">
                            <FaTimes />
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addVisit} className="text-blue-500 flex items-center gap-1">
                    <FaPlus /> {t("visit.add_visit")}
                </button>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? t("folder.saving") : t("folder.save_changes")}
                </button>
            </form>
        </Model>
    );
};

export default EditFolderModel;