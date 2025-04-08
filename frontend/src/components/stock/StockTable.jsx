import React, { useState, Suspense, lazy } from 'react';
import { Table } from '@/components/designSystem/table';
import SearchInTable from '@/components/TableComp/SearchInTable';
import TableFooter from '@/components/TableComp/TableFooter';
import SortDirection from '@/components/TableComp/SortDirection';
import AddButton from '../small/AddButton';
import useStock from '@/hooks/other/useStock';
import SortByStock from './SortByStock';
import SelectStockTable from './SelectStockTable';
import StockCards from './StockCards';
import StockTableHeader from './StockTableHeader';
import StockTableBody from './StockTableBody';

const AddStockModel = lazy(() => import('@/models/AddModels/AddStockModel'));

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
    statistics,
    fetchStocks
  } = useStock(onLoaded);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


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
              <AddButton onClick={() => setIsAddModalOpen(true)} />
            </div>
          </div>

          <Table>
            <StockTableHeader />
            <StockTableBody loading={loading} error={error} stocks={stocks} fetchStocks={fetchStocks}/>
          </Table>

          <TableFooter setPerPage={setPerPage} setPage={setPage} pagination={pagination} />
        </div>
      </div>

      {isAddModalOpen && (
        <Suspense fallback={<div>Loading Add Stock Modal...</div>}>
          <AddStockModel
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            fetchStocks={fetchStocks}
          />
        </Suspense>
      )}
    </>
  );
};

export default StockTable;
