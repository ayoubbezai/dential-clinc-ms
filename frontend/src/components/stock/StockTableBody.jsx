import React, { useState, Suspense, lazy } from 'react';
import { TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import TableSkeletonStock from '@/Skeletons/TableSkeletonStock';
import renderStockIcon from './renderStockIcon';
import { StocksService } from '@/services/shared/StocksService';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

// Lazy load the EditStockModel
const EditStockModel = lazy(() => import('@/models/EditModels/EditStockModel'));

const StockTableBody = ({ loading, error, stocks, fetchStocks }) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState(null);

    // Function to handle edit action
    const handleEdit = (stock) => {
        setCurrentStock(stock);
        setIsEditModelOpen(true);
    };
    const handleDelete = async (stockId) => {
        const result = await Swal.fire({
            title: `Delete Stock"?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const { data, error } = await StocksService.deleteStock(stockId);
            if (data) {
                toast.success("Stock deleted successfully!");
                fetchStocks?.(1); 
            } else {
                toast.error(error || "Failed to delete stock.");
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
            console.error(err);
        }
    };


    return (
        <>
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
                                <EditAndDelete
                                    element={stock}
                                    loading={loading}
                                    handleEdit={handleEdit} 
                                    handleDelete={handleDelete}

                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <NoElmentFoundInTable element={"stocks"} />
                )}
            </TableBody>

            {isEditModelOpen && currentStock && (
                <Suspense fallback={<p>Loading edit model...</p>}>
                    <EditStockModel
                        isOpen={isEditModelOpen}
                        onClose={() => setIsEditModelOpen(false)}
                        refetchStocks={fetchStocks}
                        stock={currentStock}
                    />
                </Suspense>
            )}
        </>
    );
};

export default StockTableBody;
