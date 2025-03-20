import React, { useEffect, useState } from 'react';
import Model from './Model';
import { AppointmentService } from '@/services/shared/AppointmentsService';
import toast from 'react-hot-toast';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UsersService } from '@/services/shared/UsersService';

const EditUserModel = ({ isOpen, onClose, currentUser, refreshUsers }) => {
    const [formData, setFormData] = useState({
        email: "",
        role_name: "",
        name: ""
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email || '',
                role_name: currentUser.role_name || '',
                name: currentUser.name || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            role_name: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting:", formData);
        const { data, error } = await UsersService.updateUser(
            currentUser.id,
            formData.name,
            formData.role_name,
            formData.email,
        );
        if (data?.success) {
            toast.success('Success! User details updated successfully');
            onClose();
            refreshUsers();
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className='my-4'>
                    <Label htmlFor="email" className={"mb-2 mt-3"}>Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        className={selectClassName}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Role */}
                <div>
                    <Label htmlFor="role_name" className={"mb-2 mt-3"}>Role</Label>
                    <select
                        className={selectClassName}
                        name="role_name"
                        value={formData.role_name}
                        onChange={(e) => handleSelectChange(e.target.value)}
                    >
                        <option value="dentist">dentist</option>
                        <option value="patient">patient</option>
                        <option value="receptionist">receptionist</option>
                    </select>
                </div>

                {/* Name */}
                <div className='my-4'>
                    <Label htmlFor="name" className={"mb-2 mt-3"}>Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        className={selectClassName}
                        value={formData.name}
                        onChange={handleChange}
                        required
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
    );
};

export default EditUserModel;