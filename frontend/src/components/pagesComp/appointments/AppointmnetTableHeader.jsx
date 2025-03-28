import React from 'react'
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/designSystem/table';
const AppointmnetTableHeader = () => {
  return (
      <TableHeader>
          <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tooth</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
          </TableRow>
      </TableHeader>
  )
}

export default AppointmnetTableHeader
