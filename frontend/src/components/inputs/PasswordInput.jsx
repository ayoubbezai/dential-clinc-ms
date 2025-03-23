import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const PasswordInput = ({ value, onChange, id, label, placeholder }) => {
    return (
        <div className="my-4">
            <Label htmlFor={id} className="mb-2 mt-3">{label}</Label>
            <Input
                type="password"
                id={id}
                name={id}
                className={selectClassName}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default PasswordInput;
