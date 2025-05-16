import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";
import { useTranslation } from "react-i18next";
const NameInput = ({ value, onChange }) => {
    const { t } = useTranslation('common');
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
                placeholder={`${t("enter")} ${t("name")}...`}

            />
        </div>
    );
};

export default NameInput;
