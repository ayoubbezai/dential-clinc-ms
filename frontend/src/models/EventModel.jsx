import React, { useEffect, useState } from "react";
import { MapPin, Users, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { selectClassName } from "@/constant/classNames";

const EventModel = ({ modalPosition, selectedEvent, handleCloseModal }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedEvent, setEditedEvent] = useState(selectedEvent);

    useEffect(() => {
        setEditedEvent(selectedEvent);

    }, [selectedEvent])

    if (!selectedEvent) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Updated event:", editedEvent);
        setIsEdit(false);
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
                <p className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {isEdit ? (
                        <Input
                            type="date"
                            name="start"
                            value={editedEvent.start}
                            onChange={handleChange}
                            className={selectClassName}

                        />
                    ) : (
                        <span>{editedEvent.start}</span>
                    )}
                </p>
                <p className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {isEdit ? (
                        <Input
                            type="date"
                            name="end"
                            value={editedEvent.end}
                            onChange={handleChange}
                            className={selectClassName}

                        />
                    ) : (
                        <span>{editedEvent.end}</span>
                    )}
                </p>
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
                {/* {selectedEvent.people && selectedEvent.people.length > 0 && (
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
                )} */}
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
                        console.log("Delete event:", selectedEvent);
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
