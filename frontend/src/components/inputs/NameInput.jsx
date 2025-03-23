import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const NameInput = ({ value, onChange }) => {
    return (
        <div className="">
            <Label htmlFor="name" className="mb-2 mt-2">Name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                className={selectClassName}
                value={value}
                onChange={onChange}
                required
                placeholder={`Enter name...`}

            />
        </div>
    );
};

export default NameInput;
