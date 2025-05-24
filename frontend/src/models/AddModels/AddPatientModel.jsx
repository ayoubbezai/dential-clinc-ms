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
            <h2 className="text-xl font-semibold mb-4 ">{t("patient_model.add_patient_title")}</h2>
            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-0">
                <TextInput
                    id="patient_name"
                    label={t("patient_model.patient_name")}
                    value={formData.patient_name}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <TextInput
                    id="phone"
                    label={t("patient_model.phone")}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <SelectInput
                    id="gender"
                    label={t("patient_model.gender")}
                    value={formData.gender}
                    options={[
                        { value: "", label: t("patient_model.select_gender") },
                        { value: "male", label: t("patient_model.male") },
                        { value: "female", label: t("patient_model.female") }
                    ]}
                    onChange={(value) => setFormData({ ...formData, gender: value })}
                />
                <TextInput
                    id="age"
                    label={t("patient_model.age")}
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />
                <TextInput
                    id="diseases"
                    label={t("patient_model.diseases")}
                    value={formData.diseases}
                    onChange={(e) => handleInputChange(e, setFormData)}
                />
                <TextareaInput
                    id="note"
                    label={t("patient_model.note")}
                    value={formData.note}
                    onChange={(e) => handleInputChange(e, setFormData)}
                />
                <div>
                    <Button type="submit" className="w-full text-white">
                        {t("patient_model.submit")}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPatientModel;