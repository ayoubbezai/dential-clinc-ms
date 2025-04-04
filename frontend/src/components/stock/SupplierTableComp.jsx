import React from 'react'
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import NoElmentFoundInTable from '@/components/TableComp/NoElmentFoundInTable';
import ErrorInTable from '@/components/TableComp/ErrorInTable';
import EditAndDelete from '../small/EditAndDelete';
import TableSkeletonThree from '@/Skeletons/TableSkeletonThree';
const SupplierTableComp = ({ loading, error,suppliers }) => {
  return (
      <Table className={"my-2"} divClassName="max-h-[30vh] overflow-y-auto">
          <TableHeader>
              <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Actions</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {loading ? (
                  Array.from({ length: 1 }).map((_, index) => (
                      <TableSkeletonThree key={index} />
                  ))
              ) : error ? (
                  <ErrorInTable error={error} />
              ) : suppliers?.length > 0 ? (
                  suppliers?.map((supplier) => (
                      <TableRow key={supplier.id}>
                          <TableCell>{supplier.name || 'N/A'}</TableCell>
                          <TableCell>{supplier.contact_info || 'N/A'}</TableCell>
                          <TableCell><EditAndDelete /></TableCell>
                      </TableRow>
                  ))
              ) : (
                  <NoElmentFoundInTable element={"suppliers"} />
              )}
          </TableBody>
      </Table>
  )
}

export default SupplierTableComp
