import React, { useState, Suspense, lazy } from 'react';
import { TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import { handleDeleteMedicine } from '@/utils/help/medicinesHelp';

// Lazy load the EditMedicineModel
const EditMedicineModel = lazy(() => import('@/models/EditModels/EditMedicineModel'));

const MedicinesTableBody = ({ loading, error, medicines, fetchMedicines }) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [currentMedicine, setCurrentMedicine] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleEdit = (medicine) => {
        setCurrentMedicine(medicine);
        setIsEditModelOpen(true);
    };
    const handleDelete = (medicine)=>{
        handleDeleteMedicine(medicine,setDeletingId, fetchMedicines)
    }


    return (
        <>
            <TableBody>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <TableSkeleton key={index} />
                    ))
                ) : error ? (
                    <ErrorInTable error={error} />
                ) : medicines.length > 0 ? (
                    medicines.map((medicine) => (
                        <TableRow key={medicine.id || medicine.name}>
                            <TableCell>{medicine.name || 'N/A'}</TableCell>
                            <TableCell>{medicine.category || 'N/A'}</TableCell>
                            <TableCell>{medicine.description || 'N/A'}</TableCell>
                            <TableCell>{medicine.low_stock_threshold || 'N/A'}</TableCell>
                            <TableCell>{medicine.medium_stock_threshold || 'N/A'}</TableCell>
                            <TableCell>{medicine.good_stock_threshold || 'N/A'}</TableCell>
                            <TableCell>
                                <EditAndDelete
                                    element={medicine}
                                    loading={deletingId === medicine.id}
                                    handleEdit={() => handleEdit(medicine)}
                                    handleDelete={() => handleDelete(medicine)}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <NoElmentFoundInTable element="medicines" />
                )}
            </TableBody>

            {isEditModelOpen && currentMedicine && (
                <Suspense fallback={<p>Loading edit model...</p>}>
                    <EditMedicineModel
                        isOpen={isEditModelOpen}
                        onClose={() => setIsEditModelOpen(false)}
                        refetchMedicines={fetchMedicines}
                        medicine={currentMedicine}
                    />
                </Suspense>
            )}
        </>
    );
};

export default MedicinesTableBody;
