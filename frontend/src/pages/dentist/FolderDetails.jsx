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
                <Link to={"/patients_list"} className="text-blue-600 font-semibold">Patients</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <Link to={`/patient/${patientId}`} className="text-gray-500">{folderDetails?.patient?.patient_name}</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <span className="text-gray-500">{folderDetails?.folder_name}</span>
            </p>

            <div className="grid grid-cols-12 gap-4 my-4">
                <div className="col-span-3 bg-white p-3 pb-4 shadow-sm rounded-md border  border-gray-200  text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pb-2">Folder Details</h3>
                    <p className="text-gray-600 font-medium">Title: <span className="text-[#223354]">{folderDetails?.folder_name || 'N/A'}</span></p>
                    <p className="text-gray-600 font-medium">Price: <span className="text-gray-800">{folderDetails?.price || 'N/A'}</span></p>
                    <p className={`font-medium ${folderDetails?.status === 'working_on_it' ? 'text-green-600' : 'text-red-600'}`}>
                        <span className='text-gray-600'>Status:</span> {folderDetails?.status || 'Unknown'}
                    </p>

                    <div className="mt-3 border-t pt-2">
                        <h2 className="text-[#223354] font-semibold text-sm mb-1 ">Tooth Details:</h2>
                        <div className='max-h-32 overflow-y-auto flex flex-col gap-2 py-2'>

                            {folderDetails?.visits?.length > 0 ? (
                                folderDetails.visits.map((folder, index) => (
                                    <div key={index} className="bg-gray-100 p-2 text-[13px] flex flex-col gap-[3px] m-1 rounded-md  shadow-sm ">
                                        <p className="text-gray-700"><strong>Tooth No.:</strong> {folder?.dent || 'N/A'}</p>
                                        <p className="text-gray-700"><strong>Reason:</strong> {folder?.reason_of_visit || 'N/A'}</p>
                                        <p className="text-gray-700"><strong>Treatment:</strong> {folder?.treatment_details || 'N/A'}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No tooth details available.</p>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default FolderDetails
