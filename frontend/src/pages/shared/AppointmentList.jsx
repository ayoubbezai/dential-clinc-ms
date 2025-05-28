import React from 'react';
import { useTranslation } from 'react-i18next';
import useAppointment from '@/hooks/lists/useAppointment';
import AppointmentsTable from '@/components/pagesComp/appointments/AppointmentsTable';
import PerPage from '@/components/TableComp/PerPage';
import PageChange from '@/components/TableComp/PageChange';
import SearchInTable from '@/components/TableComp/SearchInTable';
import Sort from '@/components/TableComp/Sort';
import DateInput from '@/components/inputs/DateInput';
import SelectStatusAppointment from '@/components/pagesComp/appointments/SelectStatusAppointment';

const AppointmentList = () => {
  const { t } = useTranslation('appointments');
  const { t: t2 } = useTranslation('common');
  const { t: t3 } = useTranslation('folder_details');

  const {
    appointments,
    loading,
    perPage,
    setPerPage,
    setPage,
    page,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchAppointments
  } = useAppointment();

  return (
    <>
      <div className='flex flex-col w-5/6 mt-10 mx-auto items-start'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>{t('appointments_list')}</h3>
          <p className='text-[#223354] font-semibold mt-1'>{t('appointments_list_description')}</p>
        </div>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4 gap-2'>
        <div className='flex  items-center justify-between gap-3 py-4 mt-4'>
          <SearchInTable search={search} setSearch={setSearch} />
          <div className='flex  items-center gap-1'>
            <SelectStatusAppointment status={status} setStatus={setStatus} />
            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>

        <AppointmentsTable appointments={appointments} appointmentloading={loading} fetchAppointments={fetchAppointments} t={t3} />

        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
          <p className='text-[#223354] text-sm'>
            {t2('page')} <span className='font-semibold'>{pagination.current_page || 1}</span> {t2('of')} <span className='font-semibold'>{pagination.total_pages || 1}</span>
          </p>
          <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
