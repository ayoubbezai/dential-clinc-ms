import React, { useEffect, useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import { initializeFormData, handleSubmit } from "@/utils/models/editAppointmentModel";
import { handleInputChange } from "@/utils/inputChange";
import SelectInput from "@/components/inputs/SelectInput";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const EditAppointmentModel = ({ isOpen, onClose, currentAppointment, refreshAppointments }) => {
    const [formData, setFormData] = useState(initializeFormData(currentAppointment));

    useEffect(() => {
        setFormData(initializeFormData(currentAppointment));
    }, [currentAppointment]);

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e, formData, currentAppointment, onClose, refreshAppointments)}>
                <TextInput id="title" label="Appointment Title" value={formData.title} onChange={(e) => handleInputChange(e, setFormData)} required />
                <TextInput id="date" label="Date" type="date" value={formData.date} onChange={(e) => handleInputChange(e, setFormData)} required />
                <SelectInput
                    id="status"
                    label="Status"
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                    options={[
                        { value: "pending", label: "Pending" },
                        { value: "completed", label: "Completed" },
                        { value: "rescheduled", label: "Rescheduled" },
                        { value: "cancelled", label: "Cancelled" },
                    ]}
                />


                <TextAreaInput id="content" label="Content" value={formData.content} onChange={(e) => handleInputChange(e, setFormData)} />
                <div>
                    <Button type="submit" className="w-full text-white">Submit</Button>
                </div>
            </form>
        </Model>
    );
};

export default EditAppointmentModel;
