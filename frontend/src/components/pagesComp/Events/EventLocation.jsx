import React from 'react'
import { MapPin } from "lucide-react";
import { Input } from "@/components/designSystem/input";
import { selectClassName } from "@/constant/classNames";

const EventLocation = ({ isEdit, editedEvent, handleChange, selectedEvent }) => {
    return (
        <p className="flex items-center text-gray-700">
            {(selectedEvent?.location || isEdit) &&  <MapPin className="w-4 h-4 mr-1 text-gray-500" />}
            {isEdit ? (
                <Input
                    type="text"
                    name="location"
                    value={editedEvent?.location}
                    onChange={handleChange}
                    className={selectClassName}
                />
            ) : (
                    selectedEvent?.location && <span>{editedEvent?.location}</span>
            )}
        </p>
    )
}

export default EventLocation
