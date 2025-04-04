import React from 'react'
  const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

const SelectStockTable = ({ stockStatus, setStockStatus }) => {
  return (
      <select
          className={selectClassName}
          name="stockStatus"
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
      >
          <option value="">All Status</option>
          <option value="very_good">Very Good</option>
          <option value="good">Good</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="unknown">unknown</option>
          <option value="out_of_stock">Out Of Stock</option>
      </select>
  )
}

export default SelectStockTable
