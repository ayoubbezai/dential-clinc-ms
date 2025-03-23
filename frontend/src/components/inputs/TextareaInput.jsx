import React from "react";
import { Label } from "@/components/designSystem/label";

const TextareaInput = ({ id, label, value, onChange }) => (
    <div>
        <Label htmlFor={id}>{label}</Label>
        <textarea
            className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs mb-3"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextareaInput;
