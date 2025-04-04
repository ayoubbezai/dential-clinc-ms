import React from 'react'
import Skeleton from "react-loading-skeleton";
import { TableCell, TableRow } from '@/components/designSystem/table';

const TableSkeletonThree = (index) => {
    return (
        <TableRow key={index}>
            <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'70%'} /></TableCell>

        </TableRow>
    )
}

export default TableSkeletonThree
