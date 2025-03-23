import React from 'react'
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const PatientTableHeader = () => {
    return (
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
    )
}

export default PatientTableHeader
