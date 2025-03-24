import React, { useState } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import toast from 'react-hot-toast';
import EditPatientModel from '@/models/EditModels/EditPatientModel';
import "react-loading-skeleton/dist/skeleton.css";

import PatientTableComp from './PatientTableComp';

const PatientsTable = ({ patients, fetchPatients, patientLoading }) => {

    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    async function handleDelete(patientId) {
        setLoading(true);
        const { data, error } = await PatientsService.deletePatient(patientId);
        if (data?.success) {
            toast.success('Success! Patient deleted successfully');
            fetchPatients(); // Refresh the list after deletion
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }

        setLoading(false);
    }

    function handleEdit(patient) {
        setCurrentPatient(patient);
        setIsEditModalOpen(true);
    }

    return (
        <>
            <PatientTableComp handleDelete={handleDelete} handleEdit={handleEdit} patientLoading={patientLoading} loading={loading} patients={patients}/>
            {isEditModalOpen && (
                <EditPatientModel
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    currentPatient={currentPatient}
                    refreshPatients={fetchPatients}
                />
            )}
        </>
    );
};

export default PatientsTable;