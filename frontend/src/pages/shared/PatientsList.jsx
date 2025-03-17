import React, { useEffect, useState } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [perPage, setPerPage] = useState(15);

  const fetchPatients = async (page = 1) => {
    const data = await PatientsService.getPatients(perPage, search, gender, startDate, endDate, sortBy, sortDirection, page);
    if (data.success) {
      setPatients(data.data);
      setPagination(data.pagination);
    }
  };
  const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"
  useEffect(() => {
    fetchPatients(page);
  }, [perPage, page, search, gender, sortBy, sortDirection, startDate, endDate]);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10  mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Patients list</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is patients list  admin panel</p>
        </div>
        <Button className={"text-white text-[13px]"}>+ Add Patient</Button>
      </div>
      <div className='w-5/6 bg-white mx-auto px-4'>

        <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4   '>
          <div className="relative w-full md:w-auto">
            <Label htmlFor="search"><Search className="  absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" size={18} /></Label>
            <Input
              className=" pl-8 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
            />
          </div>
          <div className='flex flex-wrap items-center gap-2'>

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
        <Table className={""}>
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
                <TableCell className={"text-primary"}>{patient?.user?.email || "No Account"}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={
                      patient.gender === "male"
                        ? " " // Styles for male
                        : "text-[#FF1975] bg-[#FFE8ED] text-[11px]" // Styles for female
                    }
                  >
                    {patient.gender}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <div className='flex gap-2'>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}><Badge className={"text-[17px] py-[1px] font-semibold"}>{`${"<"}`}</Badge></button>
            <button disabled={page === pagination.total_pages} onClick={() => setPage(page + 1)}><Badge className={"text-lg font-semibold text-[17px] py-[1px]"}>{`${">"}`}</Badge></button>
          </div>
          <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
          <div className='flex items-center'>
            <p className='text-[#223354]/50 text-sm'>Row per Page</p>
            <select
              className={`${selectClassName} outline-0 border-0`}

              name="perPage"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>
    </>

  );
};

export default PatientsList;
