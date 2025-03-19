
import useAppointment from '@/hooks/useAppointment';
import AppointmentsTable from '@/components/common/appointments/AppointmentsTable';
import AppointmentPageChange from '@/components/common/appointments/AppointmentPageChange';
import AppointmentsPerPage from '@/components/common/appointments/AppointmentsPerPage';
import PatientPerPage from '@/components/common/patient/PatientPerPage';

const AppointmentList = () => {

  const { appointments, loading ,perPage,setPerPage ,setPage,page,pagination ,fetchAppointments} = useAppointment();

  return (
    <>
      <div className='flex flex-col   w-5/6 mt-10 mx-auto items-start'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Appointments List</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is the appointments list admin panel</p>
        </div>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4'>


        <AppointmentsTable appointments={appointments} loading={loading} fetchAppointments={fetchAppointments} />
        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <AppointmentPageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
                  <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
          <PatientPerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

    </>

  );
};

export default AppointmentList;