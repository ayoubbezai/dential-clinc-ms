import React from 'react'
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';

const MedicinesTableBody = ({ loading, error, medicines }) => {
  return (
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
                      <TableCell><EditAndDelete /></TableCell>
                  </TableRow>
              ))
          ) : (
              <NoElmentFoundInTable element={"medicines"} />
          )}
      </TableBody>
  )
}

export default MedicinesTableBody
