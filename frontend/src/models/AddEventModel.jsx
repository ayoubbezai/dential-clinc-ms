import React, { useState } from 'react';
import Model from './Model';
import { EventsService } from '@/services/shared/EventsService';
import { toast, Toaster } from 'react-hot-toast';
import { selectClassName } from '@/constant/classNames';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

const COLORS = [
    { id: "blue", label: "blue", className: "bg-blue-500" },
    { id: "red", label: "red", className: "bg-red-500" },
    { id: "green", label: "green", className: "bg-green-500" },
    { id: "yellow", label: "yellow", className: "bg-yellow-500" },
    { id: "purple", label: "purple", className: "bg-purple-500" },
    { id: "orange", label: "orange", className: "bg-orange-500" },
];

const AddEventModel = ({ isOpen, onClose, eventsServicePlugin }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        startTime: null,
        endDate: '',
        endTime: null,
        title: '',
        people: [],
        calendarId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            calendarId: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        // Format people array
        const formattedPeople = formData.people.length === 0 ? null : formData.people;


        const { data, error } = await EventsService.addEvent(
            formData.startDate,
            formData.startTime,
            formData.endDate,
            formData.endTime,
            formData.title,
            formattedPeople,
            formData.calendarId,
        );
        // Combine startDate and startTime (if available)
        const start = formData.startDate + (formData.startTime ? ` ${formData.startTime}` : '');

        // Combine endDate and endTime (if available)
        const end = formData.endDate + (formData.endTime ? ` ${formData.endTime}` : '');




        console.log(data);
        if (data.success) {
            const event = {
                id: data.data.id,
                start: start,
                end: end,
                title: formData.title,
                people: formattedPeople,
                calendarId: formData.calendarId,
            };
            console.log(event)
            eventsServicePlugin.add(event)
            toast.success('Event created successfully!');
        } else {
            toast.error(error.message || 'Error! Something went wrong.');
        }
        onClose();
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Title */}
                <div>
                    <Label htmlFor="title" className={"mb-2"}>Event Title</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        className={selectClassName}
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex '>
                    {/* Start Date */}
                    <div>
                        <Label htmlFor="startDate" className={"mb-2"}>Start Date</Label>
                        <Input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className={selectClassName}
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Start Time (Optional) */}
                    <div className='ml-10'>
                        <Label htmlFor="startTime" className={"mb-2 "}>Start Time (Optional)</Label>
                        <Input
                            type="time"
                            id="startTime"
                            name="startTime"
                            className={selectClassName}
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex '>


                    {/* End Date */}
                    <div>
                        <Label htmlFor="endDate" className={"mb-2"}>End Date</Label>
                        <Input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className={selectClassName}
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* End Time (Optional) */}
                    <div className='ml-10'>
                        <Label htmlFor="endTime" className={"mb-2"}>End Time (Optional)</Label>
                        <Input
                            type="time"
                            id="endTime"
                            name="endTime"
                            className={selectClassName}
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                {/* Event Color */}
                <div>
                    <Label htmlFor="calendarId" className={"mb-2"}>Event Color</Label>
                    <select
                        name="calendarId"
                        value={formData.calendarId}
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className={selectClassName}
                        required
                    >
                        <option value="">Select a color</option>
                        {COLORS.map((color) => (
                            <option key={color.id} value={color.id}>
                                {color.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* People (Optional) */}
                <div>
                    <Label htmlFor="people" className={"mb-2"}>People (Comma Separated)</Label>
                    <Input
                        type="text"
                        id="people"
                        name="people"
                        className={selectClassName}
                        value={formData.people.join(',')}
                        onChange={(e) => setFormData({ ...formData, people: e.target.value.split(',') })}
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full text-white">
                        Submit
                    </Button>
                </div>
            </form>
            <Toaster />
        </Model>
    );
};

export default AddEventModel;