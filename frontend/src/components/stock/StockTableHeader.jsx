import React from 'react'
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const StockTableHeader = () => {
  return (
      <TableHeader>
          <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
          </TableRow>
      </TableHeader>
  )
}

export default StockTableHeader
