import React, { useState } from 'react';
import Model from './Model'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectClassName } from '@/constant/classNames';

const AddPatientModel = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        patient_name: '',
        phone: '',
        gender: '',
        age: '',
        diseases: '',
        note: '',
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
            gender: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass form data to the parent component
        onClose(); // Close the modal after submission
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name */}
                <div>
                    <Label htmlFor="patient_name">Patient Name</Label>
                    <Input
                        type="text"
                        id="patient_name"
                        name="patient_name"
                        className={selectClassName}
                        value={formData.patient_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={selectClassName}

                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Gender */}
                <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select
                        className={selectClassName}
                        name="gender"
                        value={formData.gender}
                        onChange={handleSelectChange}
                    >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Age */}
                <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                        className={selectClassName}

                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Diseases (Optional) */}
                <div>
                    <Label htmlFor="diseases">Diseases</Label>
                    <Input
                        className={selectClassName}

                        type="text"
                        id="diseases"
                        name="diseases"
                        value={formData.diseases}
                        onChange={handleChange}
                    />
                </div>

                {/* Note (Optional) */}
                <div>
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                        className={`p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs`}

                        id="note"
                        name="note"
                        value={formData.note}
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
    );
};

export default AddPatientModel;