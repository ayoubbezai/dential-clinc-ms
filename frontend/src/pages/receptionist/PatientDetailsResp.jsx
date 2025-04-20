import FolderGridTable from '@/components/pagesComp/patient/FolderGridTable';
import PatientInfo1 from '@/components/pagesComp/patient/PatientInfo1'
import usePatient from '@/hooks/other/usePatient';
import { folderService } from '@/services/dentist/foldersService';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import FolderTableFooter from "@/components/TableComp/TableFooter"
import FolderTableHeader from '@/components/pagesComp/patient/FolderTableHeader';
import PatientInfo2 from '@/components/pagesComp/patient/PatientInfo2';

const PatientDetailsResp = () => {
    const { id } = useParams();
    const {
        patient, loading, folders, refetchPatient,
        perPage, setPerPage, page, setPage, pagination, search, setSearch, refetchFolders
    } = usePatient(id);

    const [view, setView] = useState("list");
    const [isEditFolderOpen, setIsEditFolderOpen] = useState(false);

    async function handleDelete(folderId) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const response = await folderService.deleteFolder(folderId);
            if (response?.success) {
                toast.success("Folder deleted successfully!");
                refetchPatient();
            } else {
                toast.error(response?.message || "Failed to delete folder.");
            }
        }
    }
    return (
        <div className="w-full px-8 bg-background py-5 text-secondary ">
            <div className="grid grid-cols-12 gap-4 my-4">

            <PatientInfo1 patient={patient} />
                <PatientInfo2 patient={patient} refetchPatient={refetchPatient} />


            <div className="col-span-12 relative bg-[#fff] p-3 px-4 shadow-md rounded-lg mt-12">
                <FolderTableHeader view={view} setView={setView} id={id} search={search} setSearch={setSearch} refetchFolders={refetchFolders} />
                    <div className="pt-4">

                <FolderGridTable
                    loading={loading}
                    folders={folders}
                    handleDelete={handleDelete}
                    isEditFolderOpen={isEditFolderOpen}
                    setIsEditFolderOpen={setIsEditFolderOpen}
                    refetchFolders={refetchFolders}
                />
</div>
                <FolderTableFooter
                    perPage={perPage} setPerPage={setPerPage}
                    page={page} setPage={setPage} pagination={pagination}
                />

            </div>
            </div>
        </div>
    )
}

export default PatientDetailsResp
