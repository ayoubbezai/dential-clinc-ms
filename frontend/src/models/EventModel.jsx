import React, { useEffect, useState } from "react";
import { MapPin, Users, Clock, X, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { selectClassName } from "@/constant/classNames";
import { EventsService } from "@/services/shared/EventsService";
import toast from "react-hot-toast";

const COLORS = [
    { id: "blue", label: "blue", className: "bg-blue-500" },
    { id: "red", label: "red", className: "bg-red-500" },
    { id: "green", label: "green", className: "bg-green-500" },
    { id: "yellow", label: "yellow", className: "bg-yellow-500" },
    { id: "purple", label: "purple", className: "bg-purple-500" },
    { id: "orange", label: "orange", className: "bg-orange-500" },
];

const EventModel = ({ modalPosition, selectedEvent, handleCloseModal, eventsServicePlugin }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        ...selectedEvent,
        startDate: selectedEvent?.start?.split(" ")[0] || "",
        startTime: selectedEvent?.start?.split(" ")[1] || "",
        endDate: selectedEvent?.end?.split(" ")[0] || "",
        endTime: selectedEvent?.end?.split(" ")[1] || "",
    });

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

    console.log(editedEvent.endTime)

    if (!selectedEvent) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => ({
            ...prev,
            [name]: name === "people" ? value.split(",").map((p) => p.trim()) : value,
        }));
    };

    const handleSave = async () => {
        // Combine date and time for start and end
        const start = editedEvent.startDate + (editedEvent.startTime ? `T${editedEvent.startTime}` : "");
        const end = editedEvent.endDate + (editedEvent.endTime ? `T${editedEvent.endTime}` : "");

        const updatedEvent = {
            ...editedEvent,
            start,
            end,
        };

        console.log("Updated event:", updatedEvent);

        // Call the API to update the event
        const { data, error } = await EventsService.updateEvent(updatedEvent.id, updatedEvent);
        if (data.success) {
            eventsServicePlugin.update(updatedEvent);
            toast.success("Event updated successfully!");
        } else {
            toast.error(error.message || "Failed to update event.");
        }

        setIsEdit(false);
    };

    const deleteEvent = async () => {
        const { data, error } = await EventsService.deleteEvent(selectedEvent.id);
        if (data.success) {
            eventsServicePlugin.remove(selectedEvent.id);
            toast.success(data.message);
        } else {
            toast.error(error.message);
        }
    };

    return (
        <div
            className="fixed z-50 bg-white/40 backdrop-blur-md p-3 rounded-lg shadow-xl border border-gray-200 w-[260px] text-sm text-gray-800"
            style={{
                top: modalPosition.y,
                left: modalPosition.x,
                transform: "translate(-110%, -50%)",
            }}
        >
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold truncate">
                    {isEdit ? (
                        <Input
                            type="text"
                            name="title"
                            value={editedEvent.title}
                            onChange={handleChange}
                            className={selectClassName}
                        />
                    ) : (
                        editedEvent.title
                    )}
                </h2>
                <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 transition"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Event Details */}
            <div className="space-y-1">
                {/* Start Date and Time */}
                <p className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {isEdit ? (
                        <div className="flex gap-2">
                            <Input
                                type="date"
                                name="startDate"
                                value={editedEvent.startDate}
                                onChange={handleChange}
                                className={selectClassName}
                            />
                            <Input
                                type="time"
                                name="startTime"
                                value={editedEvent.startTime}
                                onChange={handleChange}
                                className={selectClassName}
                            />
                        </div>
                    ) : (
                        <span>
                            {editedEvent.startDate} {editedEvent.startTime && `at ${editedEvent.startTime}`}
                        </span>
                    )}
                </p>

                {/* End Date and Time */}
                <p className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {isEdit ? (
                        <div className="flex gap-2">
                            <Input
                                type="date"
                                name="endDate"
                                value={editedEvent.endDate}
                                onChange={handleChange}
                                className={selectClassName}
                            />
                            <Input
                                type="time"
                                name="endTime"
                                value={editedEvent.endTime}
                                onChange={handleChange}
                                className={selectClassName}
                            />
                        </div>
                    ) : (
                        <span>
                            {editedEvent.endDate} {editedEvent.endTime && `at ${editedEvent.endTime}`}
                        </span>
                    )}
                </p>

                {/* Location */}
                {selectedEvent.location && (
                    <p className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        {isEdit ? (
                            <Input
                                type="text"
                                name="location"
                                value={editedEvent.location}
                                onChange={handleChange}
                                className={selectClassName}
                            />
                        ) : (
                            <span>{editedEvent.location}</span>
                        )}
                    </p>
                )}

                {/* People */}
                {selectedEvent.people && selectedEvent.people.length > 0 && (
                    <p className="flex items-center text-gray-700 truncate">
                        <Users className="w-4 h-4 mr-1 text-gray-500" />
                        {isEdit ? (
                            <Input
                                type="text"
                                name="people"
                                value={editedEvent.people.join(", ")}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{editedEvent.people.join(", ")}</span>
                        )}
                    </p>
                )}

                {/* Color Selector */}
                <p className="flex items-center text-gray-700">
                    <Palette className={`w-4 h-4 mr-1 ${COLORS[editedEvent.calendarId] || "text-gray-500"}`} />
                    {isEdit ? (
                        <select
                            name="calendarId"
                            value={editedEvent.calendarId}
                            onChange={handleChange}
                            className={selectClassName}
                        >
                            {COLORS.map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className={`px-1 py-[1px] rounded text-[11px] font-medium text-white ${COLORS.find(c => c.id === editedEvent.calendarId)?.className}`}>
                            {COLORS.find(c => c.id === editedEvent.calendarId)?.label}
                        </span>
                    )}
                </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
                {isEdit ? (
                    <button
                        onClick={handleSave}
                        className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition-all text-xs"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all text-xs"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => {
                        deleteEvent();
                        handleCloseModal();
                    }}
                    className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-all text-xs"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EventModel;