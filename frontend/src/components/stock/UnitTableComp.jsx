import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/designSystem/table';
import DeleteIcon from "@/assets/icons/delete.svg";
import NoElmentFoundInTable from '../TableComp/NoElmentFoundInTable';
import ErrorInTable from '../TableComp/ErrorInTable';
import Skeleton from "react-loading-skeleton";
const UnitTableComp = ({ loading ,error,units}) => {
  return (
      <Table divClassName="max-h-[30vh] overflow-y-auto">
          <TableHeader>
              <TableRow>
                  <TableHead>Unit Name</TableHead>
                  <TableHead className="w-10 text-center">Delete</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {loading ? (
                  Array.from({ length: 2 }).map((_, index) => (
                      <TableRow key={index}>

                          <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
                          <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
                      </TableRow>

                  ))
              ) : error ? (
                  <ErrorInTable error={error} />
              ) : units?.length > 0 ? (
                  units.map((unit) => (
                      <TableRow key={unit.id}>
                          <TableCell>{unit.name}</TableCell>
                          <TableCell className="text-center">
                              <button>
                                  <img src={DeleteIcon} alt="Delete" />
                              </button>
                          </TableCell>
                      </TableRow>
                  ))
              ) : (
                  <NoElmentFoundInTable element="units" />
              )}
          </TableBody>
      </Table>
  )
}

export default UnitTableComp
