import React from 'react'
import { TableRow, TableCell } from '@/components/designSystem/table'
import Skeleton from 'react-loading-skeleton'
const FolderTableSkeleton = ({ index }) => {
  return (
      <TableRow key={index}>
          <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
          <TableCell><Skeleton height={20} width={'40%'} /></TableCell>
          <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
          <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
      </TableRow>
  )
}

export default FolderTableSkeleton
