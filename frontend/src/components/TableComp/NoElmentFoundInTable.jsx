import React from 'react'
import { TableRow, TableCell } from '../designSystem/table'

const NoElmentFoundInTable = ({element}) => {
  return (
      <TableRow>
          <TableCell colSpan="6" className="text-center text-gray-500">
              No {element} found.
          </TableCell>
      </TableRow>
  )
}

export default NoElmentFoundInTable
