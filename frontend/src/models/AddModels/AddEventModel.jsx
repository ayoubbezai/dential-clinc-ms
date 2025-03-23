import React, { useState } from "react";
import Model from "../other/Model";
import { EventsService } from "@/services/shared/EventsService";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/designSystem/button";
import TitleInput from "@/components/inputs/TitleInput";
import DateInput from "@/components/inputs/DateInput";
import TimeInput from "@/components/inputs/TimeInput";
import PeopleInput from "@/components/inputs/PeopleInput";
import EventColorSelect from "@/components/inputs/EventColorSelect";
import { handleInputChange } from "@/utils/inputChange";
import { initializeFormData,handlePeopleChange } from "@/utils/models/addEventModel";

export const formattedPeople =(formData)=>{
    return formData.people.length ? formData.people : null;
}
const AddEventModel = ({ isOpen, onClose, eventsServicePlugin }) => {
    const [formData, setFormData] = useState(initializeFormData());


    const formattedPeople = formattedPeople(formData)
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
                <TitleInput value={formData.title}onChange={handleInputChange(setFormData)}/>

                <div className="flex">
                    <DateInput label="Start Date" name="startDate" value={formData.startDate}onChange={handleInputChange(setFormData)}/>
                    <TimeInput label="Start Time (Optional)" name="startTime" value={formData.startTime}onChange={handleInputChange(setFormData)}className="ml-10" />
                </div>

                <div className="flex">
                    <DateInput label="End Date" name="endDate" value={formData.endDate}onChange={handleInputChange(setFormData)}/>
                    <TimeInput label="End Time (Optional)" name="endTime" value={formData.endTime}onChange={handleInputChange(setFormData)}className="ml-10" />
                </div>

                <EventColorSelect value={formData.calendarId}onChange={handleInputChange(setFormData)}/>

                <PeopleInput value={formData.people.join(", ")} onChange={handlePeopleChange(setFormData)} />

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
