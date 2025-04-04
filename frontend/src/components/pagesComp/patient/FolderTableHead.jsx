import React from 'react'
import { TableHeader, TableRow, TableHead } from '@/components/designSystem/table'

const FolderTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default FolderTableHead
