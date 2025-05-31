import React, { useState, lazy, Suspense } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/designSystem/table';
import { Badge } from '@/components/designSystem/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppointmentService } from '@/services/shared/AppointmentsService';
import toast from 'react-hot-toast';
import AppointmnetTableHeader from './AppointmnetTableHeader';
import TableSkeleton from '@/Skeletons/TableSkeleton';

// Lazy load the EditAppointmentModel
const EditAppointmentModel = lazy(() => import('@/models/EditModels/EditAppointmentModel'));

// Function to return different colors based on status
const getStatusColor = (status) => {
    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
        scheduled: "bg-blue-100 text-blue-700",
        rescheduled: "bg-purple-100 text-purple-700"
    };
    return statusColors[status] || "bg-gray-100 text-gray-700";
};

const AppointmentsTable = ({ appointments, appointmentloading, fetchAppointments, t }) => {
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    async function handleDelete(appointment_id) {
        setLoading(true);
        const { data, error } = await AppointmentService.deleteAppointment(appointment_id);
        if (data?.success) {
            toast.success(t('appointments.success_delete'));
            fetchAppointments();
        } else {
            toast.error(error?.message || t('appointments.error_delete'));
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
                <AppointmnetTableHeader t={t} />

                <TableBody>
                    {appointmentloading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableSkeleton key={index} index={index} />
                        ))
                    ) : (
                        appointments?.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.title || t('appointments.na')}</TableCell>
                                <TableCell>{appointment.tooth || t('appointments.na')}</TableCell>
                                <TableCell>{appointment.content || 'no content'}</TableCell>
                                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="default" className={getStatusColor(appointment.status)}>
                                        {t(`folder_appointments.status_${appointment.status}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer" onClick={() => handleEdit(appointment)}>
                                            <img src={EditIcon} alt={t('appointments.edit')} className="w-5" />
                                        </button>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleDelete(appointment.id)}
                                            disabled={loading}
                                        >
                                            <img src={DeleteIcon} alt={t('appointments.delete')} className="w-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {isEditModalOpen && (
                <Suspense fallback={<div>{t('folder_appointments.loading')}</div>}>
                    <EditAppointmentModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        currentAppointment={currentAppointment}
                        refreshAppointments={fetchAppointments}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default AppointmentsTable;
