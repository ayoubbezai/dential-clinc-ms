import React from 'react'
  const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

const SelectGender = ({ gender, setGender }) => {
  return (
      <select
          className={selectClassName}
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
      >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
      </select>
  )
}

export default SelectGender
