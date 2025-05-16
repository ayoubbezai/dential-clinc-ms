import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import { handleSubmit, initializeFormData } from "@/utils/models/addReceptionistModel";
import { handleInputChange } from "@/utils/other/inputChange";

const AddReceptionistModel = ({ isOpen, onClose }) => {
    const { t } = useTranslation('users');
    const [formData, setFormData] = useState(initializeFormData());

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold text-[#223354]">{t('add_receptionist_title')}</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-4 flex flex-col w-full">
                {/* Name Input */}
                <NameInput
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    className="w-full"
                    label={t('add_receptionist.name')}
                />

                {/* Email Input */}
                <EmailInput
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    className="w-full"
                    label={t('add_receptionist.email')}
                />

                {/* Password Input */}
                <PasswordInput
                    id="password"
                    label={t('add_receptionist.password')}
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder={t('add_receptionist.enter_password')}
                    required
                    minLength={6}
                    className="w-full"
                />

                {/* Submit Button */}
                <div className="w-full self-center text-center mt-4">
                    <Button type="submit" className="w-full max-w-xs mx-auto text-white mt-1">
                        {t('add_receptionist.submit')}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddReceptionistModel;
