import React, { useState, lazy, Suspense } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import "react-loading-skeleton/dist/skeleton.css";

const EditPatientModel = lazy(() => import('@/models/EditModels/EditPatientModel'));
const PatientTableComp = lazy(() => import('./PatientTableComp'));

const PatientsTable = ({ patients, fetchPatients, patientLoading }) => {
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    async function handleDelete(patientId) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "##3b82f6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            setLoading(true);
            const { data, error } = await PatientsService.deletePatient(patientId);

            if (data?.success) {
                toast.success("Success! Patient deleted successfully.");
                fetchPatients(); // Refresh the list after deletion
            } else {
                toast.error(error?.message || "Error! Something went wrong.");
            }
            setLoading(false);
        }
    }

    function handleEdit(patient) {
        setCurrentPatient(patient);
        setIsEditModalOpen(true);
    }

    return (
        <>
            <Suspense fallback={<div>Loading Patients...</div>}>
                <PatientTableComp
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    patientLoading={patientLoading}
                    loading={loading}
                    patients={patients}
                />
            </Suspense>

            {isEditModalOpen && (
                <Suspense fallback={<div>Loading Edit Modal...</div>}>
                    <EditPatientModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        currentPatient={currentPatient}
                        refreshPatients={fetchPatients}
                    />
                </Suspense>
            )}
        </>
    );
};

export default PatientsTable;
