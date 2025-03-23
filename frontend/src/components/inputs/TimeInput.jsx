import React from 'react';
import { Input } from '@/components/designSystem/input';

const TimeInput = ({ startTime, endTime, setStartTime, setEndTime }) => {
    const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs";

    return (
        <>
            <Input
                className={selectClassName}
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
            />
            <Input
                className={selectClassName}
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
            />
        </>
    );
};

export default TimeInput;
