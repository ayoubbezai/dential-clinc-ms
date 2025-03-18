import React, { useState } from 'react';
import Model from './Model'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectClassName } from '@/constant/classNames';
import { PatientsService } from '@/services/shared/PatientsService';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const EditPatientModel = ({ isOpen, onClose, currentPatient, refreshPatients }) => {
    const [formData, setFormData] = useState({
        patient_name: '',
        phone: '',
        gender: '',
        age: '',
        diseases: '',
        note: '',
    });
    useEffect(() => {
        if (currentPatient) {
            setFormData({
                patient_name: currentPatient.patient_name || '',
                phone: currentPatient.phone || '',
                gender: currentPatient.gender || '',
                age: currentPatient.age || '',
                diseases: currentPatient.diseases || '',
                note: currentPatient.note || '',
            });
        }
    }, [currentPatient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            gender: value,
        });
    };


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting:", formData);
        const { data, error } = await PatientsService.updatePatient(currentPatient.id, formData.patient_name, formData.phone, formData.gender, formData.age, formData.diseases, formData.note);
        if (data?.success) {
            toast.success('Success! Patient updated successfully');
            onClose(); // Close modal after successful update
            refreshPatients()
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
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
                        onChange={(e) => handleSelectChange(e.target.value)}
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
                        className={"p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"}

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

export default EditPatientModel;
