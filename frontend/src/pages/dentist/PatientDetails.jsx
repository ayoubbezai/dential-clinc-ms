import React, { useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Table } from "@/components/designSystem/table";
import usePatient from "@/hooks/other/usePatient";
import { folderService } from "@/services/dentist/foldersService";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

// Lazy Load Components
const PatientInfo1 = lazy(() => import("@/components/pagesComp/patient/PatientInfo1"));
const PatientInfo2 = lazy(() => import("@/components/pagesComp/patient/PatientInfo2"));
const FolderTableHeader = lazy(() => import("@/components/pagesComp/patient/FolderTableHeader"));
const FolderTableHead = lazy(() => import("@/components/pagesComp/patient/FolderTableHead"));
const FolderTableBody = lazy(() => import("@/components/pagesComp/patient/FolderTableBody"));
const FolderGridTable = lazy(() => import("@/components/pagesComp/patient/FolderGridTable"));
const FolderTableFooter = lazy(() => import("@/components/pagesComp/patient/FolderTableFooter"));

const PatientDetails = () => {
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
    <div className="w-full px-8 bg-background py-5 text-secondary">
      {/* Breadcrumb */}
      <p className="flex items-center gap-2 text-gray-700">
        <Link to="/patients_list" className="text-blue-600 font-semibold">Patients</Link>
        <HiArrowNarrowRight className="text-gray-500 mt-1" />
        <span className="text-gray-500">{patient?.patient_name}</span>
      </p>

      {/* Patient Details */}
      <div className="grid grid-cols-12 gap-4 my-4">
        <Suspense fallback={<div>Loading Patient Info...</div>}>
          <PatientInfo1 patient={patient} />
          <PatientInfo2 patient={patient} refetchPatient={refetchPatient} />
        </Suspense>

        {/* Folders Section */}
        <div className="col-span-12 relative bg-[#fff] p-3 px-4 shadow-md rounded-lg">
          <Suspense fallback={<div>Loading Header...</div>}>
            <FolderTableHeader view={view} setView={setView} id={id} search={search} setSearch={setSearch} refetchFolders={refetchFolders} />
          </Suspense>

          <div className="pt-4">
            {view === "list" ? (
              <Suspense fallback={<div>Loading Table...</div>}>
                <Table>
                  <FolderTableHead />
                  <FolderTableBody
                    loading={loading}
                    folders={folders}
                    handleDelete={handleDelete}
                    isEditFolderOpen={isEditFolderOpen}
                    setIsEditFolderOpen={setIsEditFolderOpen}
                    refetchFolders={refetchFolders}
                  />
                </Table>
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading Grid View...</div>}>
                <FolderGridTable
                  loading={loading}
                  folders={folders}
                  handleDelete={handleDelete}
                  isEditFolderOpen={isEditFolderOpen}
                  setIsEditFolderOpen={setIsEditFolderOpen}
                  refetchFolders={refetchFolders}
                />
              </Suspense>
            )}

            <Suspense fallback={<div>Loading Footer...</div>}>
              <FolderTableFooter
                perPage={perPage} setPerPage={setPerPage}
                page={page} setPage={setPage} pagination={pagination}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
