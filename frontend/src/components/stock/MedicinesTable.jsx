import useMedicine from '@/hooks/other/usemedicine';
import React, { useState, lazy, Suspense } from 'react';
import { Table } from '@/components/designSystem/table';

import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import SortByMedicne from '@/components/stock/SortByMedicine';
import AddButton from '../small/AddButton';
import MedicinesTableHeader from './MedicinesTableHeader';
import MedicinesTableBody from './MedicinesTableBody';

// Lazy import for AddMedicineModel
const AddMedicineModel = lazy(() => import('@/models/AddModels/AddMedicineModel'));

const MedicinesTable = ({ onLoaded }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const {
        medicines,
        setPerPage,
        setPage,
        pagination,
        loading,
        error,
        search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        fetchMedicines
    } = useMedicine(onLoaded);

    return (
        <>
            <div className="col-span-12 bg-white rounded-md shadow-sm py-2 px-6">
                <div className='flex justify-between my-2 items-center'>
                    <SearchInTable setSearch={setSearch} search={search} />
                    <div className='flex gap-3'>
                        <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                        <SortByMedicne sortBy={sortBy} setSortBy={setSortBy} />
                        <AddButton onClick={() => setIsAddModalOpen(true)} />
                    </div>
                </div>
                <Table className="my-2">
                    <MedicinesTableHeader />
                    <MedicinesTableBody loading={loading} error={error} medicines={medicines} />
                </Table>
                <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
            </div>

            {isAddModalOpen && (
                <Suspense fallback={<div>Loading Add Modal...</div>}>
                    <AddMedicineModel
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        fetchMedicines={fetchMedicines}
                    />
                </Suspense>
            )}
        </>
    );
};

export default MedicinesTable;
