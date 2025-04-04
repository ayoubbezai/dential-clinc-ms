import React from 'react'
import {  TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import TableSkeletonStock from '@/Skeletons/TableSkeletonStock';
import renderStockIcon from './renderStockIcon';

const StockTableBody = ({ loading, error, stocks }) => {
  return (
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
  )
}

export default StockTableBody
