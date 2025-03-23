import React, { useEffect, useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import { handleChange, handleSubmit } from "../other/EventModel";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import SelectInput from "@/components/inputs/SelectInput"; // ✅ Import Select Input

const EditUserModel = ({ isOpen, onClose, currentUser, refreshUsers }) => {
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
            <form onSubmit={(e) => handleSubmit({ e, formData, currentUser, onClose, refreshUsers })}>
                {/* Reusable Inputs */}
                <EmailInput value={formData.email} onChange={handleChange(setFormData)} />
                <NameInput value={formData.name} onChange={handleChange(setFormData)} />

                {/* Role Selection */}
                <SelectInput
                    id="role_name"
                    label="User Role"
                    value={formData.role_name}
                    onChange={handleChange(setFormData)}
                    options={[
                        { value: "", label: "Select a Role" },
                        { value: "admin", label: "Admin" },
                        { value: "editor", label: "Editor" },
                        { value: "viewer", label: "Viewer" },
                    ]}
                />

                {/* Password Inputs */}
                <PasswordInput
                    id="password"
                    label="New Password"
                    value={formData.password}
                    onChange={handleChange(setFormData)}
                    placeholder="Enter new password (optional)"
                />
                <PasswordInput
                    id="password_confirmation"
                    label="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange(setFormData)}
                    placeholder="Re-enter new password (optional)"
                />

                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full text-white">Submit</Button>
                </div>
            </form>
        </Model>
    );
};

export default EditUserModel;
