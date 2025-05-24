import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import { Badge } from '../../designSystem/badge';
import { Link } from 'react-router-dom';
import PatientTableHeader from './PatientTableHeader';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import EditAndDelete from '@/components/small/EditAndDelete';
import { useRole } from '@/hooks/Auth/useRole';
const PatientTableComp = ({ handleEdit, handleDelete, patientLoading, loading, patients, t }) => {
    const { role } = useRole();

    const getLink = (id) => {

        if (role == "receptionist") {
            return `/receptionist/patient/${id}`
        } else {
            return `/patient/${id}`
        }
    }
    return (
        <Table>
            <PatientTableHeader />
            <TableBody>
                {patientLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <TableSkeleton index={index} />
                    ))
                ) : (
                    patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell><Link to={getLink(patient.id)}>{patient.patient_name}</Link></TableCell>
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
                                    {patient.gender === "male" ? t("gender.male") : t("gender.female")}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <EditAndDelete element={patient} loading={loading} handleEdit={handleEdit} handleDelete={handleDelete} />

                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>

    )
}

export default PatientTableComp
