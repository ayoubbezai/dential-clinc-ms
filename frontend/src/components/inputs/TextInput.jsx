import React from "react";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";
import { useTranslation } from "react-i18next";


const TextInput = ({ id, label, value, onChange, type = "text", required = false }) => {
    const { t } = useTranslation("common");

    return (
        <div>
            <Label className={"mb-2 mt-2"} htmlFor={id}>{label}</Label>
            <Input
                className={selectClassName}
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={`${t("enter")} ${label}...`}
            />
        </div>
    );
}


export default TextInput;
