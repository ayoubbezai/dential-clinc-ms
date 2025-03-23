import React, { useEffect, useState } from 'react';
import Model from '../other/Model';
import { UsersService } from '@/services/shared/UsersService';
import toast from 'react-hot-toast';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';

const handleChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = async ({ e, formData, currentUser, onClose, refreshUsers }) => {
    e.preventDefault();

    // If password fields are filled, ensure they match
    if (formData.password && formData.password !== formData.password_confirmation) {
        toast.error("Passwords do not match.");
        return;
    }

    console.log("Submitting:", formData);

    // Create payload with only the fields that need updating
    const payload = {
        name: formData.name,
        role_name: formData.role_name,
        email: formData.email,
    };

    // Include password fields only if the user provided a new password
    if (formData.password) {
        payload.password = formData.password;
        payload.password_confirmation = formData.password_confirmation;
    }

    const { data, error } = await UsersService.updateUser(currentUser.id, payload);

    if (data?.success) {
        toast.success('Success! User details updated successfully');
        onClose();
        refreshUsers();
    } else {
        toast.error(error?.message || 'Error! Something went wrong.');
    }
};

const EditUserModel = ({ isOpen, onClose, currentUser, refreshUsers }) => {
    const [formData, setFormData] = useState({
        email: "",
        role_name: "",
        name: "",
        password: "",
        password_confirmation: ""
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email || '',
                role_name: currentUser.role_name || '',
                name: currentUser.name || '',
                password: "",
                password_confirmation: ""
            });
        }
    }, [currentUser]);

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={(e) => handleSubmit({ e, formData, currentUser, onClose, refreshUsers })}>
                {/* Email */}
                <div className='my-4'>
                    <Label htmlFor="email" className={"mb-2 mt-3"}>Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        className={selectClassName}
                        value={formData.email}
                        onChange={handleChange(setFormData)}
                        required
                    />
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
                        onChange={handleChange(setFormData)}
                        required
                    />
                </div>

                {/* New Password */}
                <div className='my-4'>
                    <Label htmlFor="password" className={"mb-2 mt-3"}>New Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        className={selectClassName}
                        value={formData.password}
                        onChange={handleChange(setFormData)}
                        placeholder="Enter new password (optional)"
                    />
                </div>

                {/* Confirm New Password */}
                <div className='my-4'>
                    <Label htmlFor="password_confirmation" className={"mb-2 mt-3"}>Confirm Password</Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className={selectClassName}
                        value={formData.password_confirmation}
                        onChange={handleChange(setFormData)}
                        placeholder="Re-enter new password (optional)"
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
