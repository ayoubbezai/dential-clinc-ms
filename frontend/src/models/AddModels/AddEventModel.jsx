import React, { useState } from "react";
import Model from "../other/Model";
import { EventsService } from "@/services/shared/EventsService";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/designSystem/button";
import DateInput from "@/components/inputs/DateInput";
import TimeInput from "@/components/inputs/TimeInput";
import SelectInput from "@/components/inputs/SelectInput";
import { handleInputChange } from "@/utils/inputChange";
import { initializeFormData } from "@/utils/models/addEventModel";
import TextInput from "@/components/inputs/TextInput";
import { COLORS } from "@/constant/EventsColor";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";
import { selectClassName } from "@/constant/classNames";
const AddEventModel = ({ isOpen, onClose, eventsServicePlugin }) => {
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
            toast.success("Event created successfully!");
        } else {
            toast.error(error?.message || "Error! Something went wrong.");
        }
        onClose();
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput

                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    required
                />

                <div className="flex">
                    <Input
                        type="date"                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={selectClassName}

                    />
                    <Input
                    
                        type="time"
                        label="Start Time (Optional)"
                        name="startTime"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        className={`${selectClassName} ml-10"`}
                    />
                </div>

                <div className="flex">
                    <Input
                        className={selectClassName}

                        type="date"

                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange(e, setFormData)}                    />
                    <Input
                        type="time"
                        className={`${selectClassName} ml-10"`}

                        label="End Time (Optional)"
                        name="endTime"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange(e, setFormData)}
                    />
                </div>

                <SelectInput
                    className={selectClassName}

                    id="calendarId"
                    label="Event Color"
                    value={formData.calendarId}
                    options={COLORS.map((color) => ({
                        value: color.value,
                        label: color.label,
                    }))}
                    onChange={(value) => setFormData({ ...formData, calendarId: value })}
                />
                <Label>people</Label>
                <Input
                className={selectClassName}
                    type="text"
                    name="people"
                    value={formData.people ? formData.people.join(", ") : ""}
                    onChange={(e) => {
                        const peopleArray = e.target.value.split(",").map((person) => person.trim());
                        setFormData((prev) => ({
                            ...prev,
                            people: peopleArray,
                        }));
                    }}
                />

                <div>
                    <Button type="submit" className="w-full text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddEventModel;
