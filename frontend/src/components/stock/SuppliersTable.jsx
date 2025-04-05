import useSupplier from '@/hooks/other/useSupplier'
import React, { lazy, useState ,Suspense} from 'react'

import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import AddButton from '../small/AddButton';
import SortBySupplier from './SortBySupplier';
import SupplierTableComp from './SupplierTableComp';

const AddSupplierModel = lazy(() => import('@/models/AddModels/AddSupplierModel'));

const SuppliersTable = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const { suppliers, setPerPage, setPage, pagination, loading, error, search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,fetchSuppliers } = useSupplier();
    return (
        <>
            <div className="col-span-8 bg-white  rounded-md shadow-sm py-2  px-6">
                <div className='flex justify-between my-2 items-center'>
                    <SearchInTable setSearch={setSearch} search={search} />
                    <div className='flex gap-3'>
                        <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                        <SortBySupplier sortBy={sortBy} setSortBy={setSortBy} />
                        <AddButton onClick={() => setIsAddModalOpen(true)} />
                    </div>

                </div>
                <SupplierTableComp loading={loading} error={error} suppliers={suppliers} fetchSuppliers={fetchSuppliers} />
                <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
            </div>

            {isAddModalOpen && (
                <Suspense fallback={<div>Loading Add Modal...</div>}>
                    <AddSupplierModel
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        fetchSuppliers={fetchSuppliers}
                    />
                </Suspense>
            )}
        </>
    );
}

export default SuppliersTable
