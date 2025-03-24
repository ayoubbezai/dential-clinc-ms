import React, { useState } from "react";
import Model from "@/models/other/Model";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/designSystem/input";
import { selectClassName } from "@/constant/classNames";
import { folderSevice } from "@/services/dentist/foldersService";
import toast from "react-hot-toast"; 

const AddFolderModel = ({ isOpen, onClose, patientId }) => {
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

        if (!formData.folder_name || !formData.price || !formData.status) {
            toast.error("Please fill all required fields.");
            return;
        }

        setLoading(true);
        const { data } = await folderSevice.createFolder(patientId, formData, numberOfVisits);

        if (data?.success) {
            toast.success("Folder created successfully!");
            onClose();
        } else {
            toast.error(data?.message || "Failed to create folder.");
        }

        setLoading(false);
    }

    const addVisit = () => {
        setNumberOfVisits([...numberOfVisits, { dent: "", reason_of_visit: "", treatment_details: "" }]);
    };

    const removeVisit = (index) => {
        setNumberOfVisits(numberOfVisits.filter((_, i) => i !== index));
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form className="space-y-2 p-2 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Folder Name"
                        value={formData.folder_name}
                        onChange={(e) => setFormData({ ...formData, folder_name: e.target.value })}
                        className={selectClassName}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Price"
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
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Working on it</option>
                    </select>
                </div>

                {/* Folder Visits */}
                {numberOfVisits.map((visit, index) => (
                    <div key={index} className="flex gap-2 items-center flex-wrap border-gray-400 border p-2 rounded-md">
                        <Input
                            type="text"
                            placeholder="Dent"
                            value={visit.dent}
                            onChange={(e) => handleVisitChange(index, "dent", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Reason"
                            value={visit.reason_of_visit}
                            onChange={(e) => handleVisitChange(index, "reason_of_visit", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Treatment"
                            value={visit.treatment_details}
                            onChange={(e) => handleVisitChange(index, "treatment_details", e.target.value)}
                            className={selectClassName}
                            required
                        />
                        <button type="button" onClick={() => removeVisit(index)} className="text-red-500">
                            <FaTrash />
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addVisit} className="text-blue-500 flex items-center gap-1">
                    <FaPlus /> Add Visit
                </button>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </Model>
    );
};

export default AddFolderModel;
