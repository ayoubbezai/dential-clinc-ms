import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/designSystem/button';
import SelectRole from '@/components/TableComp/SelectRole';

import PerPage from '@/components/TableComp/PerPage';
import PageChange from '@/components/TableComp/PageChange';
import SearchInTable from '@/components/TableComp/SearchInTable';
import Sort from '@/components/TableComp/Sort';
import DateInput from '@/components/inputs/DateInput';
import UsersTable from '@/components/pagesComp/users/UsersTable';
import useUser from '@/hooks/lists/useUser';
import AddReceptionistModel from '@/models/AddModels/AddReceptionistModel';

const UsersList = () => {
  const { t } = useTranslation('users');
  const { t: t2 } = useTranslation('common');
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
          <h3 className='text-[#223354] font-bold text-xl'>{t('users_list')}</h3>
          <p className='text-[#223354] font-semibold mt-1'>{t('admin_panel_desc')}</p>
        </div>
        <Button className={"text-white text-[13px]"} onClick={() => setIsModelOpen(true)}>
          + {t('add_receptionist_title')}
        </Button>
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
          <p className='text-[#223354] text-sm '>
            {t2('page')} <span className='font-semibold'>{pagination.current_page || 1}</span> {t2('of')} <span className='font-semibold'>{pagination.total_pages || 1}</span>
          </p>
          <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

      <AddReceptionistModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
    </>
  );
};

export default UsersList;
