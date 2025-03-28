
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import useFolder from '@/hooks/other/useFolder';
import FolderDetailsComp from '@/components/pagesComp/folder/FolderDetailsComp';
import FolderNotes from '@/components/pagesComp/folder/FolderNotes';
import FolderDocuments from '@/components/pagesComp/folder/FolderDocuments';
import FolderPayments from '@/components/pagesComp/folder/FolderPayments';
import FolderAppointments from '@/components/pagesComp/folder/FolderAppointments';

const FolderDetails = () => {
    const { patientId, folderId } = useParams();
    const {
        loading,
        folderDetails,
        folderNotes,
        folderPayments,
        folderAppointments,
        folderAttachments,
        fetchFolderDetails,
        fetchFolderNotes,
        fetchFolderPayments,
        fetchFolderAppointments,
        fetchFolderAttachments,
        setAppsPagination,
        appsPagination
    } = useFolder(folderId);





    return (
        <div className="w-full px-8 bg-background py-5 text-secondary">
            <p className="flex items-center gap-2 text-gray-700">
                <Link to="/patients_list" className="text-blue-600 font-semibold">Patients</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <Link to={`/patient/${patientId}`} className="text-gray-500">{folderDetails?.patient_name}</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <span className="text-gray-500">{folderDetails?.folder_name}</span>
            </p>

            <div className="grid grid-cols-12 gap-4 my-4">
                <FolderDetailsComp folderDetails={folderDetails} fetchFolderDetails={fetchFolderDetails} />
                <FolderNotes folderNotes={folderNotes} folderId={folderId} fetchFolderNotes={fetchFolderNotes} />
                <FolderDocuments folderId={folderId} folderAttachments={folderAttachments} fetchFolderAttachments={fetchFolderAttachments} />
                <FolderPayments folderDetails={folderDetails} folderPayments={folderPayments} fetchFolderPayments={fetchFolderPayments} folderId={folderId}/>
                <div className="col-span-4 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
                    <h3 className="text-[#223354] font-bold text-lg pt-1 pb-3 border-b mb-3">Prescription Details</h3>




                </div>
                <FolderAppointments folderId={folderId} folderAppointments={folderAppointments} fetchFolderAppointments={fetchFolderAppointments} loading={loading} setAppsPagination={setAppsPagination} appsPagination={appsPagination} />

               
            </div>
        </div>
    );
};

export default FolderDetails;
