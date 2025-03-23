import React, { useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import NameInput from "@/components/inputs/NameInput";
import PhoneInput from "@/components/inputs/PhoneInput";
import AgeInput from "@/components/inputs/AgeInput";
import GenderSelect from "@/components/inputs/GenderSelect";
import DiseasesInput from "@/components/inputs/DiseasesInput";
import NoteTextarea from "@/components/inputs/NoteTextarea";
import { handleInputChange } from "@/utils/inputChange";
import { initializeFormData, handleSubmit } from "@/utils/models/addPatientModel";

const AddPatientModel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initializeFormData());

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-4">
                {/* Patient Name */}
                <NameInput value={formData.patient_name} onChange={handleInputChange(setFormData)} />

                {/* Phone */}
                <PhoneInput value={formData.phone} onChange={handleInputChange(setFormData)} />

                {/* Gender */}
                <GenderSelect value={formData.gender} onChange={handleInputChange(setFormData)} />

                {/* Age */}
                <AgeInput value={formData.age} onChange={handleInputChange(setFormData)} />

                {/* Diseases (Optional) */}
                <DiseasesInput value={formData.diseases} onChange={handleInputChange(setFormData)} />

                {/* Note (Optional) */}
                <NoteTextarea value={formData.note} onChange={handleInputChange(setFormData)} />

                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPatientModel;
