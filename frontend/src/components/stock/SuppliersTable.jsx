import useSupplier from '@/hooks/other/useSupplier'
import React from 'react'
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import EditAndDelete from '../small/EditAndDelete';
import AddButton from '../small/AddButton';
import TableSkeletonThree from '@/Skeletons/TableSkeletonThree';
import SortBySupplier from './SortBySupplier';

const SuppliersTable = () => {
    const { suppliers, setPerPage, setPage, pagination, loading, error, search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection } = useSupplier();

    console.log(suppliers)

    return (
            <div className="col-span-8 bg-white  rounded-md shadow-sm py-2  px-6">
                <div className='flex justify-between my-2 items-center'>
                    <SearchInTable setSearch={setSearch} search={search} />
                    <div className='flex gap-3'>
                        <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                        <SortBySupplier sortBy={sortBy} setSortBy={setSortBy} />
                        <AddButton />
                    </div>

                </div>
            <Table className={"my-2"} divClassName="max-h-[30vh] overflow-y-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 1}).map((_, index) => (
                                <TableSkeletonThree key={index} />
                            ))
                        ) : error ? (
                            <ErrorInTable error={error} />
                        ) : suppliers?.length > 0 ? (
                            suppliers?.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>{supplier.name || 'N/A'}</TableCell>
                                    <TableCell>{supplier.contact_info || 'N/A'}</TableCell>
                                    <TableCell><EditAndDelete /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <NoElmentFoundInTable element={"suppliers"} />
                        )}
                    </TableBody>
                </Table>
                <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
            </div>
    );
}

export default SuppliersTable
