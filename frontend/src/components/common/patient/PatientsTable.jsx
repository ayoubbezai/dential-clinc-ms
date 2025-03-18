import React from 'react'
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '../../ui/badge';

const PatientsTable = ({ patients }) => {
    return (
        <Table className={""}>
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
                {patients.map((patient) => (
                    <TableRow key={patient.id}>
                        <TableCell>{patient.patient_name}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell className={"text-primary"}>{patient?.user?.email || "No Account"}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>
                            <Badge
                                variant="default"
                                className={
                                    patient.gender === "male"
                                        ? " " // Styles for male
                                        : "text-[#FF1975] bg-[#FFE8ED] text-[11px]" // Styles for female
                                }
                            >
                                {patient.gender}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default PatientsTable
