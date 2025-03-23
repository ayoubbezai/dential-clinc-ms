import React, { useEffect, useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import { initializeFormData, handleSubmit } from "@/utils/models/editPatientsModel";
import { handleInputChange } from "@/utils/inputChange";
import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextareaInput from "@/components/inputs/TextareaInput";

const EditPatientModel = ({ isOpen, onClose, currentPatient, refreshPatients }) => {
    const [formData, setFormData] = useState(initializeFormData(currentPatient));

    useEffect(() => {
        setFormData(initializeFormData(currentPatient));
    }, [currentPatient]);

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e, formData, currentPatient, onClose, refreshPatients)}>
                {/* Reusable Inputs */}
                <TextInput id="patient_name" label="Patient Name" value={formData.patient_name} onChange={(e) => handleInputChange(e, setFormData)} required />
                <TextInput id="phone" label="Phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange(e, setFormData)} required />

                {/* Gender Selection */}
                <SelectInput
                    id="gender"
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    options={[
                        { value: "", label: "All Genders" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" }
                    ]}
                />

                <TextInput id="age" label="Age" type="number" value={formData.age} onChange={(e) => handleInputChange(e, setFormData)} required />
                <TextInput id="diseases" label="Diseases" value={formData.diseases} onChange={(e) => handleInputChange(e, setFormData)} />

                {/* Note Field */}
                <TextareaInput id="note" label="Note" value={formData.note} onChange={(e) => handleInputChange(e, setFormData)} />

                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full text-white">Submit</Button>
                </div>
            </form>
        </Model>
    );
};

export default EditPatientModel;
