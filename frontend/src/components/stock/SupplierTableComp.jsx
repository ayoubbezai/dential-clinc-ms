import React, { useState, lazy, Suspense } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import TableSkeletonThree from '@/Skeletons/TableSkeletonThree';
import { handleDeleteSupplier } from '@/utils/help/supplierHelp';

// Lazy import for the edit modal
const EditSupplierModel = lazy(() => import('@/models/EditModels/EditSupplierModel'));

const SupplierTableComp = ({ loading, error, suppliers, fetchSuppliers, t }) => {
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
                        <TableHead>{t('suppliers.name')}</TableHead>
                        <TableHead>{t('suppliers.contact_info')}</TableHead>
                        <TableHead>{t('suppliers.actions')}</TableHead>
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
                                <TableCell>{supplier.name || t('suppliers.not_available')}</TableCell>
                                <TableCell>{supplier.contact_info || t('suppliers.not_available')}</TableCell>
                                <TableCell>
                                    <EditAndDelete
                                        element={supplier}
                                        loading={loading}
                                        handleEdit={handleEdit}
                                        handleDelete={() =>
                                            handleDeleteSupplier(supplier.id, fetchSuppliers)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoElmentFoundInTable element={t('suppliers.element_name')} />
                    )}
                </TableBody>
            </Table>

            {isEditModalOpen && (
                <Suspense fallback={<div>{t('suppliers.loading_edit_modal')}</div>}>
                    <EditSupplierModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        fetchSuppliers={fetchSuppliers}
                        currentSupplier={currentSupplier}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default SupplierTableComp;
