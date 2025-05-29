
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import useFolder from '@/hooks/other/useFolder';
import usePatient from '@/hooks/other/usePatient';
import FolderDetailsComp from '@/components/pagesComp/folder/FolderDetailsComp';
import FolderNotes from '@/components/pagesComp/folder/FolderNotes';
import FolderDocuments from '@/components/pagesComp/folder/FolderDocuments';
import FolderPayments from '@/components/pagesComp/folder/FolderPayments';
import FolderAppointments from '@/components/pagesComp/folder/FolderAppointments';
import FolderPrescription from '@/components/pagesComp/folder/FolderPrescription';
import { useTranslation } from "react-i18next";

const FolderDetails = () => {
    const { patientId, folderId } = useParams();
    const { t } = useTranslation("folder_details")
    const { t: tPatient } = useTranslation("patient_details")
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
    const { patient } = usePatient(patientId);
    console.log(patient)







    return (
        <div className="w-full px-8 bg-background py-5 text-secondary">
            <p className="flex items-center gap-2 text-gray-700">
                <Link to="/patients_list" className="text-blue-600 font-semibold">{t("patients")}</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <Link to={`/patient/${patientId}`} className="text-gray-500">{folderDetails?.patient_name}</Link>
                <HiArrowNarrowRight className="text-gray-500 mt-1" />
                <span className="text-gray-500">{folderDetails?.folder_name}</span>
            </p>

            <div className="grid grid-cols-12 gap-4 my-4">
                <FolderDetailsComp folderDetails={folderDetails} fetchFolderDetails={fetchFolderDetails} t={t} tPatient={tPatient} />
                <FolderNotes folderNotes={folderNotes} folderId={folderId} fetchFolderNotes={fetchFolderNotes} t={t} />
                <FolderDocuments folderId={folderId} folderAttachments={folderAttachments} fetchFolderAttachments={fetchFolderAttachments} t={t} />
                <FolderPayments folderDetails={folderDetails} folderPayments={folderPayments} fetchFolderPayments={fetchFolderPayments} folderId={folderId} t={t} />
                <FolderPrescription patient={patient}/>

                <FolderAppointments folderId={folderId} folderAppointments={folderAppointments} fetchFolderAppointments={fetchFolderAppointments} loading={loading} setAppsPagination={setAppsPagination} appsPagination={appsPagination} t={t} />


            </div>
        </div>
    );
};

export default FolderDetails;
