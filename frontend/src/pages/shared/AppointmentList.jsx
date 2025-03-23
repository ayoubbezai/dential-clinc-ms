
import useAppointment from '@/hooks/lists/useAppointment';
import AppointmentsTable from '@/components/pagesComp/appointments/AppointmentsTable';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';
import SearchInTable from '@/components/small/SearchInTable';
import Sort from '@/components/small/Sort';
import DateInput from '@/components/small/DateInput';
import SelectStatusAppointment from '@/components/small/SelectStatusAppointment';
const AppointmentList = () => {

  const { appointments, loading, perPage, setPerPage, setPage, page, pagination, search,
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
    fetchAppointments } = useAppointment();

  return (
    <>
      <div className='flex flex-col   w-5/6 mt-10 mx-auto items-start'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Appointments List</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is the appointments list admin panel</p>
        </div>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4'>

        <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4'>
          <SearchInTable search={search} setSearch={setSearch} />
          <div className='flex flex-wrap items-center gap-2'>
            <SelectStatusAppointment status={status} setStatus={setStatus} />
            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>


        <AppointmentsTable appointments={appointments} appointmentloading={loading} fetchAppointments={fetchAppointments} />
        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
          <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
          <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

    </>

  );
};

export default AppointmentList;