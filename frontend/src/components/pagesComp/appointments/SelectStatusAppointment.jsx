import React from 'react';
import { useTranslation } from 'react-i18next';

const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs";

const SelectStatusAppointment = ({ status, setStatus }) => {
  const { t } = useTranslation('appointments');
  return (
    <select
      className={selectClassName}
      name="status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">{t('status.all_status')}</option>
      <option value="scheduled">{t('status.scheduled')}</option>
      <option value="pending">{t('status.pending')}</option>
      <option value="completed">{t('status.completed')}</option>
      <option value="rescheduled">{t('status.rescheduled')}</option>
      <option value="cancelled">{t('status.cancelled')}</option>
    </select>
  );
};

export default SelectStatusAppointment;
