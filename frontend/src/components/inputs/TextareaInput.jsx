import React from "react";
import { Label } from "@/components/designSystem/label";
import { useTranslation } from "react-i18next";

const TextareaInput = ({ id, label, value, onChange }) => {
    const { t } = useTranslation("common");
    return (
        <div className="mb-2">
            <Label className={"mt-2 mb-2"} htmlFor={id}>{label}</Label>
            <textarea
                className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs mb-3"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={t("enter") + " " + label + "..."}

            />
        </div>
    );
}

export default TextareaInput;
