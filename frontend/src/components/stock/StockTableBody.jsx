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

const EditStockModel = lazy(() => import('@/models/EditModels/EditStockModel'));

// Translation helper for stock status
const getTranslatedStatus = (status, t) => {
    switch (status?.toLowerCase()) {
        case 'out of stock':
            return t('status.out_of_stock');
        case 'low':
            return t('status.low');
        case 'medium':
            return t('status.medium');
        case 'good':
            return t('status.good');
        case 'very good':
            return t('status.very_good');
        case 'unknown':
        default:
            return t('status.unknown');
    }
};

const StockTableBody = ({ loading, error, stocks, fetchStocks, t }) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState(null);

    const handleEdit = (stock) => {
        setCurrentStock(stock);
        setIsEditModelOpen(true);
    };

    const handleDelete = async (stockId) => {
        const result = await Swal.fire({
            title: `${t('confirm_delete.title') || 'Delete Stock'}?`,
            text: t('confirm_delete.text') || 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('confirm_delete.confirm') || 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            const { data, error } = await StocksService.deleteStock(stockId);
            if (data) {
                toast.success(t('messages.delete_success') || 'Stock deleted successfully!');
                fetchStocks?.(1);
            } else {
                toast.error(error || t('messages.delete_error') || 'Failed to delete stock.');
            }
        } catch (err) {
            toast.error(t('messages.unexpected_error') || 'An unexpected error occurred.');
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
                            <TableCell className="relative">
                                <span className="flex gap-1 items-center">
                                    {renderStockIcon(stock.status)}
                                    {getTranslatedStatus(stock.status, t)}
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
                    <NoElmentFoundInTable element={t('table.no_stock') || 'stocks'} />
                )}
            </TableBody>

            {isEditModelOpen && currentStock && (
                <Suspense fallback={<p>{t('messages.loading_model') || 'Loading edit model...'}</p>}>
                    <EditStockModel
                        isOpen={isEditModelOpen}
                        onClose={() => setIsEditModelOpen(false)}
                        refetchStocks={fetchStocks}
                        stock={currentStock}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default StockTableBody;
