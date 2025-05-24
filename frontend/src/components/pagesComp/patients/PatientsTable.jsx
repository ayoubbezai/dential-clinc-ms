import React, { useState, lazy, Suspense } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import "react-loading-skeleton/dist/skeleton.css";

const EditPatientModel = lazy(() => import('@/models/EditModels/EditPatientModel'));
const PatientTableComp = lazy(() => import('./PatientTableComp'));

const PatientsTable = ({ patients, fetchPatients, patientLoading, t, tCommon }) => {
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    async function handleDelete(patientId) {
        const result = await Swal.fire({
            title: t("swal.confirm_title"),
            text: t("swal.confirm_text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: t("swal.confirm_button")
        });

        if (result.isConfirmed) {
            setLoading(true);
            const { data, error } = await PatientsService.deletePatient(patientId);

            if (data?.success) {
                toast.success(t("toast.delete_success"));
                fetchPatients();
            } else {
                toast.error(error?.message || t("toast.delete_error"));
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
            <Suspense fallback={<div>{tCommon("loading.patients")}</div>}>
                <PatientTableComp
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    patientLoading={patientLoading}
                    loading={loading}
                    patients={patients}
                    t={tCommon}
                />
            </Suspense>

            {isEditModalOpen && (
                <Suspense fallback={<div>{tCommon("loading.edit_modal")}</div>}>
                    <EditPatientModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        currentPatient={currentPatient}
                        refreshPatients={fetchPatients}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default PatientsTable;
