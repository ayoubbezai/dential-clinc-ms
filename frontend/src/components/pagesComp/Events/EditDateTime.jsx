import React from 'react'
import { selectClassName } from "@/constant/classNames";
import { Clock } from "lucide-react";
import { Input } from '../../designSystem/input';

const EditDateTime = ({ isEdit, handleChange, date, time }) => {
    return (
        <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-1 text-gray-500" />
            {isEdit ? (
                <div className="flex gap-2">
                    <Input
                        type="date"
                        name="startDate"
                        value={date}
                        onChange={handleChange}
                        className={selectClassName}
                    />
                    <Input
                        type="time"
                        name="startTime"
                        value={time}
                        onChange={handleChange}
                        className={selectClassName}
                    />
                </div>
            ) : (
                <span>
                    {date} {time && `at ${time}`}
                </span>
            )}
        </div>
    )
}

export default EditDateTime
