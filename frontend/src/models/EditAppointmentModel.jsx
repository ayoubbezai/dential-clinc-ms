import React, { useEffect, useState } from 'react'
import Model from './Model';
import { AppointmentService } from '@/services/shared/AppointmentsService';
import toast from 'react-hot-toast';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
const EditAppointmentModel = ({ isOpen, onClose, currentAppointment, refreshAppointments }) => {
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        content: "",
        status: ""
    });

    console.log(currentAppointment)

    useEffect(() => {
        if (currentAppointment) {
            setFormData({
                date: currentAppointment.date || '',
                title: currentAppointment.title || '',
                content: currentAppointment.content || '',
                status: currentAppointment.status || '',

            });
        }
    }, [currentAppointment]);

    console.log(formData.status)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            status: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting:", formData);
        const { data, error } = await AppointmentService.updateAppointments(currentAppointment.id, formData.date, formData.title, formData.content, formData.status);
        if (data?.success) {
            toast.success('Success! appointment updated successfully');
            onClose(); // Close modal after successful update
            refreshAppointments()
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                {/* title */}

                <div className='my-4'>
                    <Label htmlFor="title" className={"mb-2 mt-3"}>Appointment title</Label>
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
                {/* Date */}
                <div className='my-4'>
                    <Label htmlFor="date" className={"mb-2 mt-3"}>Date</Label>
                    <Input
                        type="date"
                        id="date"
                        name="date"
                        className={selectClassName}
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Status */}
                <div>
                    <Label htmlFor="status" className={"mb-2 mt-3"}>Status</Label>
                    <select
                        className={selectClassName}
                        name="status"
                        value={formData.status}
                        onChange={(e) => handleSelectChange(e.target.value)}
                    >
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                        <option value="rescheduled">rescheduled</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>

                {/* Content (Optional) */}
                <div className='my-4'>
                    <Label htmlFor="content" className={"mb-2 mt-3"}>Content</Label>
                    <Textarea
                        className={"p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs mb-4"}

                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </div>



                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full text-white">
                        Submit
                    </Button>
                </div>

            </form>

        </Model>
    )
}

export default EditAppointmentModel

