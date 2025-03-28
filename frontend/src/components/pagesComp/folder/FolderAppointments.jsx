import React, { useState } from 'react';
import { Table, TableRow, TableBody, TableHeader, TableHead, TableCell } from '@/components/designSystem/table';
import SearchInTable from '@/components/small/SearchInTable';
import Sort from '@/components/small/Sort';
import FolderTableFooter from '../../small/TableFooter';

const FolderAppointments = ({ folderAppointments }) => {
    const [search, setSearch] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('');

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortDirection(event.target.value);
    };

    return (
        <div className="col-span-12 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
            <div className="flex items-center justify-between pb-2 px-2">
                <SearchInTable search={search} setSearch={setSearch} />
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                        <option value="">All</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <select
                        value={sortDirection}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {folderAppointments?.length > 0 ? (
                        folderAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.title}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : appointment.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {appointment.status}
                                    </span>
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{appointment.content}</TableCell>
                                <TableCell>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                                No appointments found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <FolderTableFooter />
        </div>
    );
};

export default FolderAppointments;
