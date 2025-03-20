
import React, { useState, useEffect } from 'react';
import usePatients from '@/hooks/usePatients';
import { Button } from '@/components/ui/button';
import PatientsTable from '@/components/common/patient/PatientsTable';
import SelectRole from '@/components/small/SelectRole';

import AddPatientModel from '@/models/AddPatientModel';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';
import SearchInTable from '@/components/small/SearchInTable';
import Sort from '@/components/small/Sort';
import DateInput from '@/components/small/DateInput';
import UsersTable from '@/components/common/users/UsersTable';
import useUser from '@/hooks/useUser';
const UsersList = () => {
  const {
    users,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    role,
    setRole,
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
    fetchUsers
  } = useUser();

  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    fetchUsers(page);
  }, [page, perPage, search, role, sortBy, sortDirection, startDate, endDate]);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10 mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Users list</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is Users list admin panel</p>
        </div>
        <Button className={"text-white text-[13px]"} onClick={() => setIsModalOpen(true)}>+ Add Receptionist</Button>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4'>
        <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4'>
          <SearchInTable search={search} setSearch={setSearch} />
          <div className='flex flex-wrap items-center gap-2'>
            <SelectRole role={role} setRole={setRole} />
            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>

        <UsersTable users={users} fetchUsers={fetchUsers} userLoading={loading} />

        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
          <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
          <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

      {/* <AddPatientModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </>
  );
};

export default UsersList;