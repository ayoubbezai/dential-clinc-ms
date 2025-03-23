import React from "react";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const SelectInput = ({ id, label, value, onChange, options }) => (
    <div>
        <Label className={"mb-2 mt-2"} htmlFor={id}>{label}</Label>
        <select
            className={selectClassName}
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange(e.target.value)} 
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectInput;
