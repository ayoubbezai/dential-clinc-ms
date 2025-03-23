import toast from "react-hot-toast";
import { EventsService } from "@/services/shared/EventsService";

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
