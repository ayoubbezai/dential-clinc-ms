import React, { useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import TextInput from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput"; // Updated import
import { handleInputChange } from "@/utils/other/inputChange";
import { initializeFormData, handleSubmit } from "@/utils/models/addPatientModel";
import SelectInput from "@/components/inputs/SelectInput";
import { useTranslation } from "react-i18next";

const AddPatientModel = ({ isOpen, onClose }) => {
    const { t } = useTranslation("patients");
    const [formData, setFormData] = useState(initializeFormData());

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4 ">{t("add_patient.title")}</h2>
            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-0">
                <TextInput
                    id="patient_name"
                    label={t("add_patient.patient_name")}
                    value={formData.patient_name}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <TextInput
                    id="phone"
                    label={t("add_patient.phone")}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <SelectInput
                    id="gender"
                    label={t("add_patient.gender")}
                    value={formData.gender}
                    options={[
                        { value: "", label: t("add_patient.select_gender") },
                        { value: "male", label: t("add_patient.male") },
                        { value: "female", label: t("add_patient.female") }
                    ]}
                    onChange={(value) => setFormData({ ...formData, gender: value })}
                />
                <TextInput
                    id="age"
                    label={t("add_patient.age")}
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <TextInput
                    id="diseases"
                    label={t("add_patient.diseases")}
                    value={formData.diseases}
                    onChange={(e) => handleInputChange(e, setFormData)}
                />
                <TextareaInput
                    id="note"
                    label={t("add_patient.note")}
                    value={formData.note}
                    onChange={(e) => handleInputChange(e, setFormData)}
                />
                <div>
                    <Button type="submit" className="w-full text-white">
                        {t("add_patient.submit")}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPatientModel;