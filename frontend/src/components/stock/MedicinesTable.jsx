import useMedicine from '@/hooks/other/usemedicine'
import React from 'react'
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import SortByStock from '@/components/stock/SortByStock';
import EditAndDelete from '../small/EditAndDelete';
import AddButton from '../small/AddButton';

const MedicinesTable = () => {
    const { medicines, setPerPage, setPage, pagination, loading, error, search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection } = useMedicine();

    return (
            <div className="col-span-12 bg-white  rounded-md shadow-sm py-2  px-6">
                <div className='flex justify-between my-2 items-center'>
                    <SearchInTable setSearch={setSearch} search={search} />
                    <div className='flex gap-3'>
                        <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                        <SortByStock sortBy={sortBy} setSortBy={setSortBy} />
                        <AddButton/>

                    </div>

                </div>
                <Table className={"my-2"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Low Stock</TableHead>
                            <TableHead>Medium Stock</TableHead>
                            <TableHead>Good Stock</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <TableSkeleton key={index} />
                            ))
                        ) : error ? (
                            <ErrorInTable error={error} />
                        ) : medicines.length > 0 ? (
                            medicines.map((medicine) => (
                                <TableRow key={medicine.name}>
                                    <TableCell>{medicine.name || 'N/A'}</TableCell>
                                    <TableCell>{medicine.category || 'N/A'}</TableCell>
                                    <TableCell>{medicine.description || 'N/A'}</TableCell>
                                    <TableCell>{medicine.low_stock_threshold || 'N/A'}</TableCell>
                                    <TableCell>{medicine.medium_stock_threshold || 'N/A'}</TableCell>
                                    <TableCell>{medicine.good_stock_threshold || 'N/A'}</TableCell>
                                    <TableCell><EditAndDelete/></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <NoElmentFoundInTable element={"medicines"} />
                        )}
                    </TableBody>
                </Table>
                <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
            </div>
    );
}

export default MedicinesTable
