import useFolder from '@/hooks/other/useFolder';
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom'
import { AiOutlineFilePdf } from 'react-icons/ai';

const FolderDetails = () => {
    const { patientId, folderId } = useParams();
    const { loading, folderDetails, folderDetailsError, folderNotes, folderNotesError, folderPayments, folderAppointments } = useFolder(folderId);

    console.log("folderDetails", folderDetails)
    console.log("folderNotes", folderNotes)
    console.log("folderPayments", folderPayments)
    console.log("folderAppointments", folderAppointments)

    const pdfFiles = [
        { name: "Dental Report.pdf" },
        { name: "X-Ray Analysis.pdf" },
        { name: "Treatment Plan.pdf" },
        { name: "Invoice.pdf" },
        { name: "Treatment Plan.pdf" },
    ];


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
                <div className="col-span-4 bg-white p-3 pb-4 shadow-sm rounded-md border  border-gray-200  text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pb-3">Folder Details</h3>
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
                                    <div key={index} className="bg-[#F0F8FA] p-2 text-[13px] flex flex-col gap-[3px] m-1 rounded-md  shadow-sm ">
                                        <p className="text-gray-900 font-semibold">Tooth No.: <span className="text-[#223354] font-normal">{folder?.dent || 'Untitled'}</span></p>

                                        <p className="text-gray-900 font-semibold">Reason: <span className="text-[#223354] font-normal">{folder?.reason_of_visit || 'Untitled'}</span></p>

                                        <p className="text-gray-900 font-semibold">Treatment: <span className="text-[#223354] font-normal">{folder?.treatment_details || 'Untitled'}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No tooth details available.</p>
                            )}
                        </div>
                    </div>
                </div>


                <div className="col-span-4 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pb-1">Notes</h3>

                    <div className="max-h-60 overflow-y-auto flex flex-col gap-2 py-2">
                        {folderNotes?.length > 0 ? (
                            folderNotes.map((note, index) => (
                                <div key={index} className="bg-[#F0F8FA] p-2 text-[13px] flex flex-col gap-[3px] m-1 rounded-md shadow-sm">
                                    <p className="text-gray-800 font-semibold">Title: <span className="text-[#223354] font-normal">{note?.title || 'Untitled'}</span></p>
                                    <p className="text-gray-800 font-medium">Content: <span className="text-gray-600 font-normal">{note?.content || 'No content available'}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No notes available.</p>
                        )}
                    </div>
                </div>

                <div className="col-span-4 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pb-1">PDF Documents</h3>

                    <div className="max-h-60 overflow-y-auto flex flex-col gap-2 py-2">
                        {pdfFiles.map((pdf, index) => (
                            <div
                                key={index}
                                className="bg-[#F0F8FA] p-2 text-[13px] flex items-center gap-2 m-1 rounded-md shadow-sm"
                            >
                                <AiOutlineFilePdf className="text-red-600 text-lg" />
                                <span className="text-[#223354] font-medium">{pdf.name}</span>
                            </div>
                        ))}
                    </div>
                </div>




            </div>
        </div>
    )
}

export default FolderDetails
