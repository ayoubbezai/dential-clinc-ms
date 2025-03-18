import React, { useState, useEffect } from 'react';
import usePatients from '@/hooks/usePatients';
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
  const {
    patients,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    gender,
    setGender,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    perPage,
    setPerPage,
    loading,
    fetchPatients // Add fetchPatients from usePatients
  } = usePatients();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch patients whenever any filter or sorting parameter changes
  useEffect(() => {
    fetchPatients(page); // Fetch patients with the current page
  }, [page, perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10 mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Patients list</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is patients list admin panel</p>
        </div>
        <Button className={"text-white text-[13px]"} onClick={() => setIsModalOpen(true)}>+ Add Patient</Button>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4'>
        <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4'>
          <PatientSearch search={search} setSearch={setSearch} />
          <div className='flex flex-wrap items-center gap-2'>
            <SelectGender gender={gender} setGender={setGender} />
            <PatientDateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <PatientSort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>

        <PatientsTable patients={patients} fetchPatients={fetchPatients} />

        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PatientPageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
          <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
          <PatientPerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

      <AddPatientModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PatientsList;