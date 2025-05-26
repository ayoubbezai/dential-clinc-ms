import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import DeleteIcon from "@/assets/icons/delete.svg";
import NoElmentFoundInTable from '../TableComp/NoElmentFoundInTable';
import ErrorInTable from '../TableComp/ErrorInTable';
import Skeleton from "react-loading-skeleton";
import { handleDeleteUnit } from '@/utils/help/unitsHelp';

const UnitTableComp = ({ loading, error, units, fetchUnits, t }) => {
    const [deletingId, setDeletingId] = useState(null);

    return (
        <Table divClassName="max-h-[30vh] overflow-y-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>{t('units.unit_name')}</TableHead>
                    <TableHead className="w-10 text-center">{t('units.delete')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    Array.from({ length: 2 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
                            <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
                        </TableRow>
                    ))
                ) : error ? (
                    <ErrorInTable error={error} />
                ) : units?.length > 0 ? (
                    units.map((unit) => (
                        <TableRow key={unit.id}>
                            <TableCell>{unit.name}</TableCell>
                            <TableCell className="text-center">
                                <button
                                    onClick={() => handleDeleteUnit(unit.id, fetchUnits, setDeletingId)}
                                    disabled={deletingId === unit.id}
                                    className='cursor-pointer'
                                >
                                    {deletingId === unit.id ? t('units.deleting') : <img src={DeleteIcon} alt={t('units.delete')} />}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <NoElmentFoundInTable element={t('units.units')} />
                )}
            </TableBody>
        </Table>
    );
};

export default UnitTableComp;
