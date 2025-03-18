import React, { useEffect, useState } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';
import { Button } from '@/components/ui/button';
import PatientSearch from '@/components/common/patient/patientSearch';
import SelectGender from '@/components/small/SelectGender';
import PatientsTable from '@/components/common/patient/PatientsTable';
import PatientDateInput from '@/components/common/patient/PatientDateInput';
import PatientSort from '@/components/common/patient/PatientSort';
import PatientPerPage from '@/components/common/patient/PatientPerPage';
import PatientPageChange from '@/components/common/patient/PatientPageChange';
import AddPatientModel from '@/models/AddPatientModel';


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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const fetchPatients = async (page = 1) => {
    setLoading(true)
    const { data, error } = await PatientsService.getPatients(perPage, search, gender, startDate, endDate, sortBy, sortDirection, page);
    if (data.success) {
      setPatients(data.data);
      setPagination(data.pagination);

    }else{
      setError(error)
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchPatients(page);
  }, [page, perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

  useEffect(() => {
    setPage(1);
  }, [perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10  mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Patients list</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is patients list  admin panel</p>
        </div>
        <Button className={"text-white text-[13px]"} onClick={() => setIsModalOpen(true)}>+ Add Patient</Button>
        </div>
      <div className='w-5/6 bg-white mx-auto px-4'>

        <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4   '>
          <PatientSearch search={search} setSearch={setSearch} />
          <div className='flex flex-wrap items-center gap-2'>
            <SelectGender gender={gender} setGender={setGender} />
            <PatientDateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <PatientSort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>

        <PatientsTable patients={patients} />

        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PatientPageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading}/>
         
          <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>

          <PatientPerPage perPage={perPage} setPerPage={setPerPage} />
          
        </div>
      </div>
      <AddPatientModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>

  );
};

export default PatientsList;
