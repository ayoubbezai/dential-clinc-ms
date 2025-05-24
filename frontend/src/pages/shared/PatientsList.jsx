import React, { useState, lazy, Suspense } from 'react';
import usePatients from '@/hooks/lists/usePatients';
import { Button } from '@/components/designSystem/button';
import SelectGender from '@/components/TableComp/SelectGender';
import PerPage from '@/components/TableComp/PerPage';
import PageChange from '@/components/TableComp/PageChange';
import SearchInTable from '@/components/TableComp/SearchInTable';
import Sort from '@/components/TableComp/Sort';
import DateInput from '@/components/inputs/DateInput';
import { useTranslation } from 'react-i18next';

// Lazy load large components
const PatientsTable = lazy(() => import('@/components/pagesComp/patients/PatientsTable'));
const AddPatientModel = lazy(() => import('@/models/AddModels/AddPatientModel'));

const PatientsList = () => {
  const { t } = useTranslation('patients');
  const { t: t2 } = useTranslation('common');

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
    fetchPatients
  } = usePatients();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10 mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>{t('patients_list.title')}</h3>
          <p className='text-[#223354] font-semibold mt-1'>{t('patients_list.description')}</p>
        </div>
        <Button className={"text-white text-[13px]"} onClick={() => setIsModalOpen(true)}>
          {t('patients_list.add_patient_button')}
        </Button>
      </div>

      <div className='w-5/6 bg-white mx-auto px-4'>
        <div className='flex  items-center justify-between gap-6  py-4 mt-4 w-full mx-auto'>
          <SearchInTable search={search} setSearch={setSearch} />
          <div className='flex  items-center gap-1'>
            <SelectGender gender={gender} setGender={setGender} />
            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
          </div>
        </div>

        {/* Use Suspense to show fallback loading UI */}
        <Suspense fallback={<p>{t('patients_list.loading_patients')}</p>}>
          <PatientsTable patients={patients} fetchPatients={fetchPatients} patientLoading={loading} t={t} tCommon={t2} />
        </Suspense>

        <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={loading} />
          <p className='text-[#223354] text-sm '>
            {t2('page')} <span className='font-semibold'>{pagination.current_page || 1}</span> {t2('of')} <span className='font-semibold'>{pagination.total_pages || 1}</span>
          </p>
          <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>

      {/* Lazy load modal */}
      {isModalOpen && (
        <Suspense fallback={<p>{t('patients_list.loading_modal')}</p>}>
          <AddPatientModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default PatientsList;
