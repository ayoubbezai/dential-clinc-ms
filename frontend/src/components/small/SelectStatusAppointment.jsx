import React from 'react'
  const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

const SelectStatusAppointment = ({ status, setStatus }) => {
  return (
      <select
          className={selectClassName}
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
      >
          <option value="">All Status</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
          <option value="rescheduled">rescheduled</option>
          <option value="cancelled">cancelled</option>
      </select>
  )
}


export default SelectStatusAppointment
