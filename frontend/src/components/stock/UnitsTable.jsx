import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import AddButton from '../small/AddButton';
import DeleteIcon from "@/assets/icons/delete.svg";
import PageChange from '../TableComp/PageChange';
import useUnits from '@/hooks/other/useUnits';
import NoElmentFoundInTable from '../TableComp/NoElmentFoundInTable';
import ErrorInTable from '../TableComp/ErrorInTable';
import Skeleton from "react-loading-skeleton";

const UnitsTable = () => {
    const {
        units,
        pagination,
        page,
        setPage,
        loading,
        error,
    } = useUnits();

    return (
        <div className="col-span-4 bg-white rounded-md shadow-sm py-4 px-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Units</h2>
                <AddButton />
            </div>

            <Table divClassName="max-h-[30vh] overflow-y-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Unit Name</TableHead>
                        <TableHead className="w-10 text-center">Delete</TableHead>
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
                                    <button>
                                        <img src={DeleteIcon} alt="Delete" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoElmentFoundInTable element="units" />
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center pb-2 px-4 mt-4">
                <PageChange page={page} setPage={setPage} />
                <p className="text-[13px]">
                    Page {pagination?.current_page || 1} of {pagination?.total_pages || 1}
                </p>
            </div>
        </div>
    );
};

export default UnitsTable;
