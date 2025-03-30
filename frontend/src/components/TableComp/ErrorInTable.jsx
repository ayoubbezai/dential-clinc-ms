import React from 'react'
import { TableRow, TableCell } from '../designSystem/table'

const ErrorInTable = ({error}) => {
  return (
      <TableRow>
          <TableCell colSpan="6" className="text-center text-red-500">
              {error}
          </TableCell>
      </TableRow>
  )
}

export default ErrorInTable
