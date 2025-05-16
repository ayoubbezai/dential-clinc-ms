import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";
import { useTranslation } from "react-i18next";

const EmailInput = ({ value, onChange }) => {
    const { t } = useTranslation('common');
    return (
        <div className="">
            <Label htmlFor="email" className="mb-2 mt-3">Email</Label>
            <Input
                type="email"
                id="email"
                name="email"
                className={selectClassName}
                value={value}
                onChange={onChange}
                required
                placeholder={`${t("enter")} ${t("email")}...`}

            />
        </div>
    );
};

export default EmailInput;
