import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import EditAndDelete from '../small/EditAndDelete';
import AddButton from '../small/AddButton';
import useStock from '@/hooks/other/useStock';
import { FaExclamationCircle, FaTimes, FaExclamationTriangle, FaCheckCircle, FaThumbsUp, FaQuestionCircle } from 'react-icons/fa';
import SortByStock from './SortByStock';
import TableSkeletonStock from '@/Skeletons/TableSkeletonStock';
import SelectStockTable from './SelectStockTable';
import StockCards from './StockCards';

const renderStockIcon = (stockLevel) => {
    switch (stockLevel) {
        case 'Low':
            return <FaExclamationCircle className="text-red-500" />;
        case 'Medium':
            return <FaExclamationTriangle className="text-yellow-500" />;
        case 'Good':
            return <FaCheckCircle className="text-green-500" />;
        case 'Very Good':
            return <FaThumbsUp className="text-blue-500" />;
        case 'Unknown':
            return <FaQuestionCircle className="text-gray-500" />;
        case 'Out Of Stock':
            return <FaTimes className="text-red-500" />;
        default:
            return <FaQuestionCircle className="text-gray-500" />;
    }
};

const StockTable = ({ onLoaded }) => {
    const {
        stocks,
        pagination,
        setPage,
        search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        setPerPage,
        loading,
        error,
        stockStatus,
        setStockStatus,
        statistics
    } = useStock(onLoaded);



    return (
        <>
            <div className="grid grid-cols-12 gap-4 mt-[10px]">
                <StockCards statistics={statistics} />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-[30px]">
                <div className="col-span-12 bg-white rounded-md shadow-sm py-4 px-6">
                    <div className="flex justify-between items-center mb-4">
                        <SearchInTable setSearch={setSearch} search={search} />
                        <div className="flex gap-3">
                            <SelectStockTable stockStatus={stockStatus} setStockStatus={setStockStatus} />
                            <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                            <SortByStock sortBy={sortBy} setSortBy={setSortBy} />
                            <AddButton />
                        </div>
                    </div>


                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medicine</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <TableSkeletonStock key={index} />
                                ))
                            ) : error ? (
                                <ErrorInTable error={error} />
                            ) : stocks?.length > 0 ? (
                                stocks.map((stock) => (
                                    <TableRow key={stock.id}>
                                        <TableCell>{stock.medicine_name || 'N/A'}</TableCell>
                                        <TableCell>{stock.supplier_name || 'N/A'}</TableCell>
                                        <TableCell>{stock.unit_name || 'N/A'}</TableCell>
                                        <TableCell>{stock.quantity}</TableCell>
                                        <TableCell>${parseFloat(stock.price).toFixed(2)}</TableCell>
                                        <TableCell>{stock.expiry_date || 'N/A'}</TableCell>
                                        <TableCell className={"relative"}>
                                            <span className='flex gap-1 items-center'>
                                                {renderStockIcon(stock.status)}
                                                {stock.status} {stock.status !== 'Out Of Stock' && "Status"}
                                            </span>

                                        </TableCell>
                                        <TableCell>
                                            <EditAndDelete />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <NoElmentFoundInTable element={"stocks"} />
                            )}
                        </TableBody>
                    </Table>

                    <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
                </div>
            </div>
        </>
    );
};

export default StockTable;
