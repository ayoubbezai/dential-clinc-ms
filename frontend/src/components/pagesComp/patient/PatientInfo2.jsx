import React from 'react'
import PatientActions from './PatientActions'

const PatientInfo2 = ({ patient, refetchPatient }) => {
  return (
      <div className="col-span-8 bg-white p-4 pb-6 shadow-md rounded-lg">
          <PatientActions patient={patient} refetchPatient={refetchPatient} />


          <hr className='mb-5 text-gray-400' />
          <div className="grid grid-cols-2 gap-5 text-sm ">
              <p><strong>Full Name:</strong> {patient?.patient_name || "N/A"}</p>
              <p><strong>Phone:</strong> {patient?.phone || "N/A"}</p>
              <p><strong>Age:</strong> {patient?.age || "N/A"}</p>
              <p><strong>Gender:</strong> {patient?.gender || "N/A"}</p>
              <p><strong>Patient ID:</strong> {patient?.id || "N/A"}</p>
              <p><strong>Diseases:</strong> {patient?.diseases || "No known diseases"}</p>
          </div>
      </div>
  )
}

export default PatientInfo2
