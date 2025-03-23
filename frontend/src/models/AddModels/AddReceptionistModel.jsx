import React, { useState } from "react";
import Model from "../other/Model";
import { Button } from "@/components/designSystem/button";
import EmailInput from "@/components/inputs/EmailInput";
import NameInput from "@/components/inputs/NameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import { handleSubmit, initializeFormData } from "@/utils/models/addReceptionistModel";
import { handleInputChange } from "@/utils/inputChange";

const AddReceptionistModel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initializeFormData());

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit(e, formData, onClose)} className="space-y-0 flex flex-col">
                {/* Name Input */}
                <NameInput value={formData.name} onChange={(e) => handleInputChange(e, setFormData)} />

                {/* Email Input */}
                <EmailInput value={formData.email} onChange={(e) => handleInputChange(e, setFormData)} />

                {/* Password Input */}
                <PasswordInput
                    id="password"
                    label="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                />

                {/* Submit Button */}
                <div className="w-full self-center text-center mt-4">
                    <Button type="submit" className="w-1/2 mx-auto text-white mt-1">
                        Submit
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddReceptionistModel;
