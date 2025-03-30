import React from 'react'
import { selectClassName } from '@/constant/classNames'

const FilterByTypePayment = ({type,setType}) => {
  return (
      <select
          className={selectClassName}

          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
      >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="refund">Refund</option>
      </select>
  )
}

export default FilterByTypePayment
