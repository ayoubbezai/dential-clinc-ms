import React from 'react'
import { Input } from '@/components/ui/input';

const UserDateInput = ({ startDate ,endDate ,setStartDate,setEndDate}) => {
    const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

  return (
    <>
          <Input
              className={selectClassName}

              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder='Start Date'
          />
          <Input
              className={selectClassName}

              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder='End Date'
          />
    </>
  )
}

export default UserDateInput
