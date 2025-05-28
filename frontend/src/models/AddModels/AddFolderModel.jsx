import React, { useState } from "react";
import Model from "@/models/other/Model";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Input } from "@/components/designSystem/input";
import { selectClassName } from "@/constant/classNames";
import { folderService } from "@/services/dentist/foldersService";
import toast from "react-hot-toast";

const AddFolderModel = ({ isOpen, onClose, patientId, refetchFolders, t }) => {
    const [formData, setFormData] = useState({ folder_name: "", price: "", status: "" });
    const [numberOfVisits, setNumberOfVisits] = useState([{ dent: "", reason_of_visit: "", treatment_details: "" }]);
    const [loading, setLoading] = useState(false);

    const handleVisitChange = (index, field, value) => {
        const updatedVisits = [...numberOfVisits];
        updatedVisits[index][field] = value;
        setNumberOfVisits(updatedVisits);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if (!formData.folder_name || !formData.price || !formData.status) {
            toast.error(t("add_folder.error_fill_all_fields", "Please fill all required fields."));
            setLoading(false);
            return;
        }

        const { data } = await folderService.createFolder(patientId, formData, numberOfVisits);
        setLoading(false);

        if (data?.success) {
            toast.success(t("add_folder.success_created", "Folder created successfully!"));
            refetchFolders();
            onClose();
        } else {
            toast.error(data?.message || t("add_folder.error_failed", "Failed to create folder."));
        }
    }

    const addVisit = () => {
        setNumberOfVisits([...numberOfVisits, { dent: "", reason_of_visit: "", treatment_details: "" }]);
    };

    const removeVisit = (index) => {
        setNumberOfVisits(numberOfVisits.filter((_, i) => i !== index));
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold mb-2 ml-4">{t("add_folder.title", "Create Folder For Patient")}</h2>
            <form className="space-y-4 p-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder={t("add_folder.folder_name_placeholder", "Folder Name")}
                        value={formData.folder_name}
                        onChange={(e) => setFormData({ ...formData, folder_name: e.target.value })}
                        className={selectClassName}
                        required
                    />
                    <Input
                        type="number"
                        placeholder={t("add_folder.price_placeholder", "Price")}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className={selectClassName}
                        required
                    />
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className={selectClassName}
                        required
                    >
                        <option value="">{t("add_folder.select_status", "Select Status")}</option>
                        <option value="pending">{t("status.pending", "Pending")}</option>
                        <option value="working_on_it">{t("status.working_on_it", "Working on it")}</option>
                    </select>
                </div>

                {numberOfVisits.map((visit, index) => (
                    <div
                        key={index}
                        className="flex gap-2 items-center border-gray-200 border p-2 rounded-md bg-gray-50/50"
                    >
                        <Input
                            type="text"
                            placeholder={t("add_folder.dent_placeholder", "Dent")}
                            value={visit.dent}
                            onChange={(e) => handleVisitChange(index, "dent", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <Input
                            type="text"
                            placeholder={t("add_folder.reason_placeholder", "Reason")}
                            value={visit.reason_of_visit}
                            onChange={(e) => handleVisitChange(index, "reason_of_visit", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <Input
                            type="text"
                            placeholder={t("add_folder.treatment_placeholder", "Treatment")}
                            value={visit.treatment_details}
                            onChange={(e) => handleVisitChange(index, "treatment_details", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <button type="button" onClick={() => removeVisit(index)} className="text-red-500 text-lg">
                            <FaTimes />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addVisit}
                    className="text-blue-500 flex items-center gap-1"
                >
                    <FaPlus /> {t("add_folder.add_visit", "Add Visit")}
                </button>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? t("add_folder.submitting", "Submitting...") : t("add_folder.submit", "Submit")}
                </button>
            </form>
        </Model>
    );
};

export default AddFolderModel;
