import useFolder from '@/hooks/other/useFolder';
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom'

const FolderDetails = () => {
    const { patientId, folderId } = useParams();
    const { loading, folderDetails, folderDetailsError, folderNotes, folderNotesError, folderPayments, folderAppointments } = useFolder(folderId);

    console.log("folderDetails", folderDetails)
    console.log("folderNotes", folderNotes)
    console.log("folderPayments", folderPayments)
    console.log("folderAppointments", folderAppointments)

    return (
        <div className="w-full px-8 bg-background py-5 text-secondary">
            <p className="flex items-center gap-2 text-gray-700">
                <Link to={"/patients_list"}  className="text-blue-600 font-semibold">Patients</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <Link to={`/patient/${patientId}`} className="text-gray-500">{folderDetails?.patient?.patient_name}</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <span className="text-gray-500">{folderDetails?.folder_name}</span>
            </p>
        </div>
    )
}

export default FolderDetails
