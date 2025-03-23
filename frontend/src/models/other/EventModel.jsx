import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adjestuedTop, adjestuedLeft } from "@/utils/AdjustEvent";
import { EventsService } from "@/services/shared/EventsService";
import EventHeader from "@/components/pagesComp/Events/EventHeader";
import EventDetails from "@/components/pagesComp/Events/EventDetails";
import EventActions from "@/components/pagesComp/Events/EventActions";

function combineDateAndTime(date, time) {
    return date + (time ? ` ${time}` : '');
}

export const handleSave = async ({ editedEvent, eventsServicePlugin, setIsEdit }) => {
    const start = combineDateAndTime(editedEvent.startDate, editedEvent.startTime);
    const end = combineDateAndTime(editedEvent.endDate, editedEvent.endTime);

    const { data, error } = await EventsService.updateEvent(
        editedEvent.id,
        editedEvent.startDate,
        editedEvent.startTime,
        editedEvent.endDate,
        editedEvent.endTime,
        editedEvent.title,
        editedEvent.people,
        editedEvent.location,
        editedEvent.calendarId
    );

    if (data.success) {
        eventsServicePlugin.update({
            id: editedEvent.id,
            start,
            end,
            title: editedEvent.title,
            people: editedEvent.people,
            location: editedEvent.location,
            calendarId: editedEvent.calendarId,
        });

        toast.success("Event updated successfully!");
        setIsEdit(false);
    } else {
        toast.error(error.message || "Failed to update event.");
    }
};

export const handleChange = (setEditedEvent) => (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
        ...prev,
        [name]: name === "people" ? value.split(",").map((p) => p.trim()) : value,
    }));
};

export const deleteEvent = async ({ selectedEvent, eventsServicePlugin }) => {
    const { data, error } = await EventsService.deleteEvent(selectedEvent.id);
    if (data.success) {
        eventsServicePlugin.remove(selectedEvent.id);
        toast.success(data.message);
    } else {
        toast.error(error.message);
    }
};

const EventModel = ({ modalPosition, selectedEvent, handleCloseModal, eventsServicePlugin }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedEvent, setEditedEvent] = useState({});

    useEffect(() => {
        if (selectedEvent) {
            setEditedEvent({
                ...selectedEvent,
                startDate: selectedEvent.start?.split(" ")[0] || "",
                startTime: selectedEvent.start?.split(" ")[1] || "",
                endDate: selectedEvent.end?.split(" ")[0] || "",
                endTime: selectedEvent.end?.split(" ")[1] || "",
            });
        }
    }, [selectedEvent]);



    return (
        <div
            className="fixed z-50 bg-white/40 backdrop-blur-md p-3 rounded-lg shadow-xl 
                       border border-gray-200 w-[260px] text-sm text-gray-800 
                       -translate-x-[110%] -translate-y-1/2 
                       [top:var(--top)] [left:var(--left)]"
            style={{
                "--top": `${adjestuedTop(modalPosition)}px`,
                "--left": `${adjestuedLeft(modalPosition)}px`,
            }}
        >
            <EventHeader
                isEdit={isEdit}
                editedEvent={editedEvent}
                handleChange={handleChange(setEditedEvent)}
                handleCloseModal={handleCloseModal}
            />
            <EventDetails
                isEdit={isEdit}
                editedEvent={editedEvent}
                handleChange={handleChange(setEditedEvent)}
                setEditedEvent={setEditedEvent}
                selectedEvent={selectedEvent}
            />
            <EventActions
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                handleSave={() => handleSave({ editedEvent, eventsServicePlugin, setIsEdit })}
                deleteEvent={() => deleteEvent({ selectedEvent ,eventsServicePlugin})}
                handleCloseModal={handleCloseModal}
            />
        </div>
    );
};

export default EventModel;
