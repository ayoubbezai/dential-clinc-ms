import React from 'react'

import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

const AppointmentsTable = ({ appointments, loading }) => {
    return (
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
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Loading...
                        </TableCell>
                    </TableRow>
                ) : (
                    appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell>{appointment.title}</TableCell>
                            <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="default"
                                    className={
                                        appointment.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : appointment.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                    }
                                >
                                    {appointment.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{appointment.folder_name}</TableCell>
                            <TableCell>{appointment.patient_name}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <button className="cursor-pointer">
                                        <img src={EditIcon} alt="edit" className="w-5" />
                                    </button>
                                    <button className="cursor-pointer">
                                        <img src={DeleteIcon} alt="delete" className="w-5" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default AppointmentsTable
