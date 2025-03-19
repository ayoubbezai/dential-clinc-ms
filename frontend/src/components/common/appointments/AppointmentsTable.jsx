import React, { useState } from 'react'

import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppointmentService } from '@/services/shared/AppointmentsService';
import toast from 'react-hot-toast';
import EditAppointmentModel from '@/models/EditAppointmentModel';
const getStatusClasses = (status) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        case 'rescheduled':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
const AppointmentsTable = ({ appointments, appointmentloading, fetchAppointments }) => {

    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    async function handleDelete(appointment_id) {
        setLoading(true);
        const { data, error } = await AppointmentService.deleteAppointment(appointment_id);
        if (data?.success) {
            toast.success('Success! appointment deleted successfully');
            fetchAppointments(); // Refresh the list after deletion
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }

        setLoading(false);
    }

    function handleEdit(appointment) {
        setCurrentAppointment(appointment);
        setIsEditModalOpen(true);
    }


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Folder Name</TableHead>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointmentloading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'40%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
                            </TableRow>
                        ))) : (
                        appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.title}</TableCell>
                                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="default" className={getStatusClasses(appointment.status)}>
                                        {appointment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{appointment.folder_name}</TableCell>
                                <TableCell>{appointment.patient_name}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer" onClick={() => handleEdit(appointment)}>
                                            <img src={EditIcon} alt="edit" className="w-5" />
                                        </button>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleDelete(appointment.id)}
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
            {
                isEditModalOpen && (
                    <EditAppointmentModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        currentAppointment={currentAppointment}
                        refreshAppointments={fetchAppointments}
                    />
                )
            }</>
    )
}

export default AppointmentsTable
