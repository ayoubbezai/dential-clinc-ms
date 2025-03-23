import React, { useState } from 'react';
import Model from '../other/Model'; // Ensure this path is correct
import { Button } from '@/components/designSystem/button';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { UsersService } from '@/services/shared/UsersService';
import { selectClassName } from '@/constant/classNames';
import { Eye, EyeOff } from "lucide-react";
const AddReceptionistModel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        const { data, error } = await UsersService.createReceptionist(formData.name, formData.email, formData.password);
        if (data.success) {
            toast.success('Success! Receptionist created successfully');
        } else {
            toast.error(error.message || 'Error! Something went wrong.');
        }
        onClose();
    }

    return (
        <Model isOpen={isOpen} onClose={onClose} >
            <form onSubmit={handleSubmit} className="space-y-6  flex flex-col ">
                {/* Name */}
                <div>
                    <Label htmlFor="name" className={"mb-1"}>Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${selectClassName} md:w-2/3 `}
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email" className={"mb-1"}>Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        className={`${selectClassName} md:w-2/3 `}

                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="relative w-full">
                    <Label className="my-2 " htmlFor="password">Password</Label>
                    <Input
                        value={formData.password}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border-[#D0D5DD] text-sm pr-10 placeholder:text-xs"
                        required
                        onChange={handleChange}

                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-[37px] cursor-pointer text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Submit Button */}
                <div className='w-full self-center text-center mt-4 '>
                    <Button type="submit" className="w-1/2 mx-auto text-white">
                        Submit
                    </Button>
                </div>
            </form>
            <Toaster />
        </Model>
    );
};

export default AddReceptionistModel;