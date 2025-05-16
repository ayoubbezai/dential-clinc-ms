import React, { useState } from "react";
import Model from "../other/Model";
import { EventsService } from "@/services/shared/EventsService";
import { toast } from "react-hot-toast";
import { Button } from "@/components/designSystem/button";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import { handleInputChange } from "@/utils/other/inputChange";
import { initializeFormData } from "@/utils/models/addEventModel";
import { COLORS } from "@/constant/EventsColor";
import { selectClassName } from "@/constant/classNames";
import { useTranslation } from "react-i18next";

const AddEventModel = ({ isOpen, onClose, eventsServicePlugin }) => {
    const { t } = useTranslation("schedule");
    const [formData, setFormData] = useState(initializeFormData());
    const formattedPeople = formData.people.length ? formData.people : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await EventsService.addEvent(
            formData.startDate,
            formData.startTime || null,
            formData.endDate,
            formData.endTime || null,
            formData.title,
            formattedPeople,
            formData.calendarId
        );

        if (data?.success) {
            eventsServicePlugin.add({
                id: data.data.id,
                start: `${formData.startDate} ${formData.startTime || ""}`.trim(),
                end: `${formData.endDate} ${formData.endTime || ""}`.trim(),
                title: formData.title,
                people: formattedPeople,
                calendarId: formData.calendarId,
            });
            toast.success(t("add_event.success"));
        } else {
            toast.error(error?.message || t("add_event.error"));
        }

        onClose();
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    id="title"
                    label={t("add_event.title")}
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />

                <div className="flex">
                    <Input
                        type="date"
                        label={t("add_event.start_date")}
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={selectClassName}
                    />
                    <Input
                        type="time"
                        label={t("add_event.start_time")}
                        name="startTime"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={`${selectClassName} ml-10`}
                    />
                </div>

                <div className="flex">
                    <Input
                        type="date"
                        label={t("add_event.end_date")}
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={selectClassName}
                    />
                    <Input
                        type="time"
                        label={t("add_event.end_time")}
                        name="endTime"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={`${selectClassName} ml-10`}
                    />
                </div>

                <SelectInput
                    id="calendarId"
                    label={t("add_event.event_color")}
                    value={formData.calendarId}
                    options={COLORS.map((color) => ({
                        value: color.value,
                        label: t(`colors.${color.id}`),
                    }))}
                    onChange={(value) => setFormData({ ...formData, calendarId: value })}
                    className={selectClassName}
                />

                <Label>{t("add_event.people")}</Label>
                <Input
                    type="text"
                    name="people"
                    className={selectClassName}
                    value={formData.people ? formData.people.join(", ") : ""}
                    onChange={(e) => {
                        const peopleArray = e.target.value
                            .split(",")
                            .map((person) => person.trim());
                        setFormData((prev) => ({
                            ...prev,
                            people: peopleArray,
                        }));
                    }}
                />

                <div>
                    <Button type="submit" className="w-full text-white">
                        {t("add_event.submit")}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddEventModel;
