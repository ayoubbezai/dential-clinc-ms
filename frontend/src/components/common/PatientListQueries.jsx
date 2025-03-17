import React from 'react'

const PatientListQueries = () => {
  return (
      <div className='flex justify-between px-4 my-2'>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search patients...' />
          <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
          <Input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} placeholder='Created At' />
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='Start Date' />
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder='End Date' />
          <select name="sort_direction" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
          </select>
          <select name="sort_by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="created_at">Created At</option>
              <option value="patient_name">Name</option>
              <option value="age">Age</option>
          </select>
      </div>
  )
}

export default PatientListQueries
