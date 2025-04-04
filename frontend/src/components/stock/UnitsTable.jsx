import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import AddButton from '../small/AddButton';
import DeleteIcon from "@/assets/icons/delete.svg" 

const UnitsTable = () => {
    const units = [
        { id: 1, name: 'Box' },
        { id: 2, name: 'Bottle' },
        { id: 3, name: 'Strip' },
    ];

    return (
        <div className="col-span-4 bg-white rounded-md shadow-sm py-4 px-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Units</h2>
                <AddButton />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Unit Name</TableHead>
                        <TableHead className="w-10 text-center">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {units.map((unit) => (
                        <TableRow key={unit.id}>
                            <TableCell>{unit.name}</TableCell>
                            <TableCell className="text-center">
                                <button>
                                    <img src={DeleteIcon} alt="" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UnitsTable;
