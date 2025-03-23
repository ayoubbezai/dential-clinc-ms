import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const TextInput = ({ id, label, value, onChange, type = "text", required = false }) => (
    <div>
        <Label className={"mb-2 mt-3"} htmlFor={id}>{label}</Label>
        <Input
            className={selectClassName}
        
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={`Enter ${id}...`}
        />
    </div>
);

export default TextInput;
