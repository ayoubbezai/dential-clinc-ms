import React, { useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import TextInput from "@/components/inputs/TextInput";
import SelectGender from "@/components/small/SelectGender";
import TextareaInput from "@/components/inputs/TextareaInput"; // Updated import
import { handleInputChange } from "@/utils/inputChange";
import { initializeFormData, handleSubmit } from "@/utils/models/addPatientModel";
import SelectInput from "@/components/inputs/SelectInput";

const AddPatientModel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initializeFormData());

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-0">
                <TextInput id="patient_name" label="Patient Name" value={formData.patient_name} onChange={(e) => handleInputChange(e, setFormData)} required />
                <TextInput id="phone" label="Phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange(e, setFormData)} required />
                <SelectInput
                    id="gender"
                    label="Gender"
                    value={formData.gender}
                    options={[
                        { value: "", label: "select Gender" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" }
                    ]}
                    onChange={(value) => setFormData({ ...formData, gender: value })}
                />

                <TextInput id="age" label="Age" type="number" value={formData.age} onChange={(e) => handleInputChange(e, setFormData)} required />
                <TextInput id="diseases" label="Diseases" value={formData.diseases} onChange={(e) => handleInputChange(e, setFormData)} />
                <TextareaInput id="note" label="Note" value={formData.note} onChange={(e) => handleInputChange(e, setFormData)} /> {/* Updated here */}

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
