import React from 'react'
import Skeleton from "react-loading-skeleton";
import { TableCell, TableRow } from '@/components/designSystem/table';

const TableSkeletonStock = (index) => {
    return (
        <TableRow key={index}>
            <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'40%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
            <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
        </TableRow>
    )
}


export default TableSkeletonStock
