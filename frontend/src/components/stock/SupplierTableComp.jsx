import React, { useState, lazy, Suspense } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import TableSkeletonThree from '@/Skeletons/TableSkeletonThree';
import { handleDeleteSupplier } from '@/utils/help/supplierHelp';

// Lazy import for the edit modal
const EditSupplierModel = lazy(() => import('@/models/EditModels/EditSupplierModel'));

const SupplierTableComp = ({ loading, error, suppliers, fetchSuppliers }) => {
    const [deletingId, setDeletingId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null);

    function handleEdit(supplier) {
        setCurrentSupplier(supplier);
        setIsEditModalOpen(true);
    }


    return (
        <>
            <Table className="my-2" divClassName="max-h-[30vh] overflow-y-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 1 }).map((_, index) => (
                            <TableSkeletonThree key={index} />
                        ))
                    ) : error ? (
                        <ErrorInTable error={error} />
                    ) : suppliers?.length > 0 ? (
                        suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.name || 'N/A'}</TableCell>
                                <TableCell>{supplier.contact_info || 'N/A'}</TableCell>
                                <TableCell>
                                    <EditAndDelete
                                        element={supplier}
                                        loading={loading}
                                        handleEdit={handleEdit}
                                        handleDelete={() =>
                                            handleDeleteSupplier(supplier.id, setDeletingId, fetchSuppliers)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoElmentFoundInTable element="suppliers" />
                    )}
                </TableBody>
            </Table>

            {isEditModalOpen && (
                <Suspense fallback={<div>Loading edit modal...</div>}>
                    <EditSupplierModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        fetchSuppliers={fetchSuppliers}
                        currentSupplier={currentSupplier}
                    />
                </Suspense>
            )}
        </>
    );
};

export default SupplierTableComp;
