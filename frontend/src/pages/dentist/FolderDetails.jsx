import useFolder from '@/hooks/other/useFolder';
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom'
import { AiOutlineFilePdf } from 'react-icons/ai';
import { Table, TableRow, TableBody, TableHeader, TableHead, TableCell } from '@/components/designSystem/table';
import FolderDetailsComp from '@/components/pagesComp/folder/FolderDetailsComp';
import FolderNotes from '@/components/pagesComp/folder/FolderNotes';
import FolderDocuments from '@/components/pagesComp/folder/FolderDocuments';
import FolderPayments from '@/components/pagesComp/folder/FolderPayments';
const FolderDetails = () => {
    const { patientId, folderId } = useParams();
    const { loading,
        folderDetails,
        folderNotes,
        folderPayments,
        folderAppointments,
        folderAttachments,
        folderDetailsError,
        folderNotesError,
        folderPaymentsError,
        folderAppointmentsError,
        folderAttachmentsError,
        fetchAllFolderDetails,//fetch all details
        fetchFolderDetails,//fetch only fodler details
        fetchFolderNotes,
        fetchFolderPayments,
        fetchFolderAppointments,
        fetchFolderAttachments, } = useFolder(folderId);


    console.log("folderDetails", folderDetails)
    console.log("folderNotes", folderNotes)
    console.log("folderPayments", folderPayments)
    console.log("folderAppointments", folderAppointments)
    console.log("folderAttachments", folderAttachments)

    




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
                {/* folderDetails 6 col */}
                <FolderDetailsComp folderDetails={folderDetails} fetchFolderDetails={fetchFolderDetails}/>
                {/* folder notes 6 col */}
                <FolderNotes folderNotes={folderNotes} folderId={folderId} fetchFolderNotes={fetchFolderNotes} />
                {/* folder Documents 4 col */}
                <FolderDocuments folderId={folderId} folderAttachments={folderAttachments} fetchFolderAttachments={fetchFolderAttachments}  />
                {/* folder payments 4 col */}
                <FolderPayments folderDetails={folderDetails} folderPayments={folderPayments} fetchFolderPayments={fetchFolderPayments}/>



                <div className="col-span-4 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pt-1 pb-3 border-b mb-3">Prescription Details</h3>




                </div>

                <div className="col-span-12 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {folderAppointments?.length > 0 ? (
                                folderAppointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>{appointment.title}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'cancelled'
                                                ? 'bg-red-100 text-red-800'
                                                : appointment.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {appointment.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{appointment.content}</TableCell>
                                        <TableCell>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                                        No appointments found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>






            </div>
        </div>
    )
}

export default FolderDetails
