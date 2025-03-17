import React, { useEffect, useState } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';


const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchPatients = async (page = 1) => {
    const data = await PatientsService.getPatients(20, search, gender, startDate, endDate, sortBy, sortDirection, page);
    if (data.success) {
      setPatients(data.data);
      setPagination(data.pagination);
    }
  };
  const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"
  useEffect(() => {
    fetchPatients(page);
  }, [page, search, gender, sortBy, sortDirection, startDate, endDate]);

  return (
    <div className='w-5/6 bg-white mx-auto'>
      <div className='flex flex-wrap items-center justify-between gap-4 px-4 my-4 bg-gray-50 p-6 rounded-lg shadow-sm'>
        <div>
          <Input
            className='p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search patients...'
          />
        </div>
        <div className='flex flex-wrap items-center gap-2 px-2'>

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
          <select
            className={selectClassName}

            name="sort_direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            className={selectClassName}

            name="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created_at">Created At</option>
            <option value="patient_name">Name</option>
            <option value="age">Age</option>
          </select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NAME</TableHead>
            <TableHead>PHONE</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>AGE</TableHead>
            <TableHead>GENDER</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.patient_name}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient?.user?.email || "No Account"}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between px-4 mt-4'>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {pagination.current_page || 1} of {pagination.total_pages || 1}</span>
        <button disabled={page === pagination.total_pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PatientsList;
