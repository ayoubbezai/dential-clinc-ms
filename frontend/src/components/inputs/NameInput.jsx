import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const NameInput = ({ value, onChange }) => {
    return (
        <div className="my-4">
            <Label htmlFor="name" className="mb-2 mt-3">Name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                className={selectClassName}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default NameInput;
