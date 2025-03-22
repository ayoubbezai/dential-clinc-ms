import React, { useState } from 'react';
import Model from './Model'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectClassName } from '@/constant/classNames';
import { PatientsService } from '@/services/shared/PatientsService';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


const AddPatientModel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        patient_name: '',
        phone: '',
        gender: '',
        age: Number,
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

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
        const { data, error } = await PatientsService.createPatient(formData.patient_name, formData.phone, formData.gender, formData.age, formData.diseases, formData.note);
        if (data.success) {
            toast.success('Success! Patient created succefully');
        } else {
            toast.error(error.message || 'Error! Something went wrong.');

        }
        onClose();
    }


    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name */}
                <div>
                    <Label htmlFor="patient_name" className={"mb-1"}>Patient Name</Label>
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
                    <Label className={"mb-1"} htmlFor="phone">Phone</Label>
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
                    <Label className={"mb-1"} htmlFor="gender">Gender</Label>
                    <select
                        className={selectClassName}
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => handleSelectChange(e.target.value)}
                    >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Age */}
                <div>
                    <Label className={"mb-1"}  htmlFor="age">Age</Label>
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
                    <Label className={"mb-1"} htmlFor="diseases">Diseases</Label>
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
                    <Label className={"mb-1"} htmlFor="note">Note</Label>
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
            <Toaster />

        </Model>
    );
};

export default AddPatientModel;