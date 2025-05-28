import React from 'react';
import PatientActions from './PatientActions';

const PatientInfo2 = ({ patient, refetchPatient, t }) => {
    return (
        <div className="col-span-8 bg-white p-4 pb-6 shadow-md rounded-lg">
            <PatientActions patient={patient} refetchPatient={refetchPatient} t={t} />

            <hr className='mb-5 text-gray-400' />
            <div className="grid grid-cols-2 gap-5 text-sm">
                <p><strong>{t("patient_info2.full_name")}</strong> {patient?.patient_name || t("patient_info2.no_data")}</p>
                <p><strong>{t("patient_info2.phone")}</strong> {patient?.phone || t("patient_info2.no_data")}</p>
                <p><strong>{t("patient_info2.age")}</strong> {patient?.age || t("patient_info2.no_data")}</p>
                <p><strong>{t("patient_info2.gender")}</strong> {patient?.gender || t("patient_info2.no_data")}</p>
                <p><strong>{t("patient_info2.patient_id")}</strong> {patient?.id || t("patient_info2.no_data")}</p>
                <p><strong>{t("patient_info2.diseases")}</strong> {patient?.diseases || t("patient_info2.no_diseases")}</p>
            </div>
        </div>
    );
};

export default PatientInfo2;
