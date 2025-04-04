import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import { Badge } from '@/components/designSystem/badge';
import PaymentsTableHeader from '@/components/pagesComp/payments/PaymentsTableHeader';
import { getTypeClassName } from '@/utils/help/paymentsHelp';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import { Link } from 'react-router-dom';

const PaymentsTable = ({ allPayments, paymentsLoading, paymentsError }) => {
    return (
        <Table className={"my-2"}>
            <PaymentsTableHeader />
            <TableBody>
                {paymentsLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TableSkeleton key={index} />
                    ))
                ) : paymentsError ? (
                    <ErrorInTable error={paymentsError} />
                ) : allPayments?.length > 0 ? (
                    allPayments?.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.amount || 'N/A'}</TableCell>
                            <TableCell>        <Badge
                                variant="default"
                                className={
                                    getTypeClassName(payment.type)
                                }
                            >
                                {payment.type || 'N/A'}
                            </Badge></TableCell>
                            <TableCell>{payment.note || 'N/A'}</TableCell>
                            <TableCell>{<Link to={`/patient/${payment.patient_id}`}>{payment.patient_name}</Link> || 'N/A'}</TableCell>
                            <TableCell>{<Link to={`/patient/${payment.patient_id}/folder/${payment.folder_id}`}>{payment.folder_name}</Link> || 'N/A'}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <NoElmentFoundInTable element={"payments"} />
                )}
            </TableBody>
        </Table>
    )
}

export default PaymentsTable
