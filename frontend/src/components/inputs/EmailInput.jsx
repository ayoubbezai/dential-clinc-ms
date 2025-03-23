import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";

const EmailInput = ({ value, onChange }) => {
    return (
        <div className="my-4">
            <Label htmlFor="email" className="mb-2 mt-3">Email</Label>
            <Input
                type="email"
                id="email"
                name="email"
                className={selectClassName}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default EmailInput;
