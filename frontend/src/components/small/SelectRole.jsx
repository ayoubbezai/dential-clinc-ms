import React from 'react'
const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

const SelectRole = ({ role, setRole }) => {
    return (
        <select
            className={selectClassName}
            name="gender"
            value={role}
            onChange={(e) => setRole(e.target.value)}
        >
            <option value="">All Roles</option>
            <option value="dentist">dentist</option>
            <option value="patient">patient</option>
            <option value="receptionist">receptionist</option>
        </select>
    )
}

export default SelectRole
