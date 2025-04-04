import React from 'react'
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const MedicinesTableHeader = () => {
  return (
      <TableHeader>
          <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Low Stock</TableHead>
              <TableHead>Medium Stock</TableHead>
              <TableHead>Good Stock</TableHead>
              <TableHead>Action</TableHead>
          </TableRow>
      </TableHeader>
  )
}



export default MedicinesTableHeader
