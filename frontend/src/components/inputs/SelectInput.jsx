import React from "react";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const SelectInput = ({ id, label, value, onChange, options }) => (
    <div>
        <Label htmlFor={id}>{label}</Label>
        <select className={selectClassName} id={id} name={id} value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectInput;
