import React from 'react'
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const PaymentsTableHeader = () => {
  return (
      <TableHeader>
          <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Folder Name</TableHead>
          </TableRow>
      </TableHeader>
  )
}

export default PaymentsTableHeader
