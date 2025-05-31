import React, { useEffect, useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import { initializeFormData, handleSubmit } from "@/utils/models/editAppointmentModel";
import { handleInputChange } from "@/utils/other/inputChange";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "rescheduled", label: "Rescheduled" },
    { value: "cancelled", label: "Cancelled" },
    { value: "scheduled", label: "Scheduled" },
];

const EditAppointmentModel = ({ isOpen, onClose, currentAppointment, refreshAppointments }) => {
    const [formData, setFormData] = useState(() => initializeFormData(currentAppointment));


    useEffect(() => {
        setFormData(initializeFormData(currentAppointment));
    }, [currentAppointment]);

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={(e) => handleSubmit(e, formData, currentAppointment, onClose, refreshAppointments)}
                className="p-4 space-y-4"
            >
                <TextInput
                    id="title"
                    label="Appointment Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />

                <TextInput
                    id="date"
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />


                <TextInput
                    id="tooth"

                    type="number"
                    label="Tooth (Optional)"
                    value={formData.tooth}
                    onChange={(e) => handleInputChange(e, setFormData)}

                />

                <SelectInput
                    id="status"
                    label="Status"
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                    options={statusOptions}
                />

                <TextAreaInput
                    id="content"
                    label="Content (Optional)"
                    value={formData.content}
                    onChange={(e) => handleInputChange(e, setFormData)}
                />

                <div className="pt-4">
                    <Button type="submit" className="w-full text-white text-lg py-2">
                        Submit
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default EditAppointmentModel;