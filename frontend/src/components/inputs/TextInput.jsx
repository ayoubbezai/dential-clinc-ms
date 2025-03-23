import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const TextInput = ({ id, label, value, onChange, type = "text", required = false }) => (
    <div>
        <Label htmlFor={id}>{label}</Label>
        <Input
            type={type}
            id={id}
            name={id}
            className={selectClassName}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default TextInput;
