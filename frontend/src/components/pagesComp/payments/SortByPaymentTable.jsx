import React from 'react'
import { selectClassName } from '@/constant/classNames'


const SortByPaymentTable = ({sortBy , setSortBy}) => {
  return (
      <select
          className={selectClassName}

          name="sort_by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
      >
          <option value="patient_name">Patient Name</option>
          <option value="amount">Amount</option>
          <option value="created_at">Date</option>
      </select>
  )
}

export default SortByPaymentTable


