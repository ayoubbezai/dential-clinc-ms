import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '../../ui/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { PatientsService } from '@/services/shared/PatientsService';
import toast from 'react-hot-toast';

const PatientsTable = ({ patients }) => {
    const [loading, setLoading] = useState(false);
    const [deletedPatients, setDeletedPatients] = useState([]);

    async function handleDelete(patientId) {
        setLoading(true);
        const { data, error } = await PatientsService.deletePatient(patientId);
        if (data.success) {
            toast.success('Success! Patient deleted successfully');
            setDeletedPatients((prevDeleted) => [...prevDeleted, patientId]);
        } else {
            toast.error(error.message || 'Error! Something went wrong.');
        }
        setLoading(false);
    }

    return (
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
                {patients.filter(patient => !deletedPatients.includes(patient.id)).map((patient) => (
                    <TableRow key={patient.id}>
                        <TableCell>{patient.patient_name}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell className="text-primary">{patient?.user?.email || "No Account"}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>
                            <Badge
                                variant="default"
                                className={
                                    patient.gender === "male"
                                        ? "" // Styles for male
                                        : "text-[#FF1975] bg-[#FFE8ED] text-[11px]" // Styles for female
                                }
                            >
                                {patient.gender}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className='flex gap-2'>
                                <button className='cursor-pointer'><img src={EditIcon} alt="edit" className='w-5' /></button>
                                <button className='cursor-pointer' onClick={() => handleDelete(patient.id)} disabled={loading}>
                                    <img src={DeleteIcon} alt="delete" className='w-5' />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default PatientsTable;
