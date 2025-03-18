import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '../../ui/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { PatientsService } from '@/services/shared/PatientsService';
import toast from 'react-hot-toast';
import EditPatientModel from '@/models/EditPatientModel';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PatientsTable = ({ patients, fetchPatients }) => {
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>NAME</TableHead>
                        <TableHead>PHONE</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead>AGE</TableHead>
                        <TableHead>GENDER</TableHead>
                        <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.length === 0 ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'40%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.patient_name}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell className="text-primary">
                                    {patient?.user?.email || "No Account"}
                                </TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="default"
                                        className={
                                            patient.gender === "male"
                                                ? "" // Male styles (default)
                                                : "text-[#FF1975] bg-[#FFE8ED] text-[11px]" // Female styles
                                        }
                                    >
                                        {patient.gender}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer" onClick={() => handleEdit(patient)}>
                                            <img src={EditIcon} alt="edit" className="w-5" />
                                        </button>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleDelete(patient.id)}
                                            disabled={loading}
                                        >
                                            <img src={DeleteIcon} alt="delete" className="w-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

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