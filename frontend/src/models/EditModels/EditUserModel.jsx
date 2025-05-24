import React, { useEffect, useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import { handleSubmit } from "@/utils/models/editUserModel";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import { handleInputChange } from "@/utils/other/inputChange";
import { useTranslation } from "react-i18next";

const EditUserModel = ({ isOpen, onClose, currentUser, refreshUsers }) => {
    const { t } = useTranslation("common");
    const { t: tUser } = useTranslation("users");

    const [formData, setFormData] = useState({
        email: "",
        role_name: "",
        name: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email || "",
                role_name: currentUser.role_name || "",
                name: currentUser.name || "",
                password: "",
                password_confirmation: "",
            });
        }
    }, [currentUser]);

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold mb-4">{tUser("edit_user_model.title")}</h2>
            <form onSubmit={(e) => handleSubmit({ e, formData, currentUser, onClose, refreshUsers })}>
                <EmailInput
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    label={t("email")}
                />
                <NameInput
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    label={t("name")}
                />
                <PasswordInput
                    id="password"
                    label={t("password")}
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder={tUser("edit_user_model.password_placeholder")}
                />
                <PasswordInput
                    id="password_confirmation"
                    label={t("confirm")}
                    value={formData.password_confirmation}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder={tUser("edit_user_model.confirm_placeholder")}
                />
                <div>
                    <Button type="submit" className="w-full text-white mt-4">
                        {t("submit")}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default EditUserModel;
