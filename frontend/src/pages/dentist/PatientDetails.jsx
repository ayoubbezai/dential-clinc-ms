import React, { useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Table } from "@/components/designSystem/table";
import usePatient from "@/hooks/other/usePatient";
import { folderService } from "@/services/dentist/foldersService";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Lazy Load Components
const PatientInfo1 = lazy(() => import("@/components/pagesComp/patient/PatientInfo1"));
const PatientInfo2 = lazy(() => import("@/components/pagesComp/patient/PatientInfo2"));
const FolderTableHeader = lazy(() => import("@/components/pagesComp/patient/FolderTableHeader"));
const FolderTableHead = lazy(() => import("@/components/pagesComp/patient/FolderTableHead"));
const FolderTableBody = lazy(() => import("@/components/pagesComp/patient/FolderTableBody"));
const FolderGridTable = lazy(() => import("@/components/pagesComp/patient/FolderGridTable"));
const FolderTableFooter = lazy(() => import("@/components/TableComp/TableFooter"));

const PatientDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation("patient_details");
  const {
    patient, loading, folders, refetchPatient,
    perPage, setPerPage, page, setPage, pagination, search, setSearch, refetchFolders
  } = usePatient(id);

  const [view, setView] = useState("list");
  const [isEditFolderOpen, setIsEditFolderOpen] = useState(false);

  async function handleDelete(folderId) {
    const result = await Swal.fire({
      title: t("alert.delete_confirm_title"),
      text: t("alert.delete_confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("alert.delete_confirm_button")
    });

    if (result.isConfirmed) {
      const response = await folderService.deleteFolder(folderId);
      if (response?.success) {
        toast.success(t("alert.delete_success"));
        refetchPatient();
      } else {
        toast.error(response?.message || t("alert.delete_fail"));
      }
    }
  }

  return (
    <div className="w-full px-8 bg-[#f0f8fa] py-5 text-[#223354]">
      {/* Breadcrumb */}
      <p className="flex items-center gap-2 text-gray-700">
        <Link to="/patients_list" className="text-blue-600 font-semibold">{t("breadcrumb.patients")}</Link>
        <HiArrowNarrowRight className="text-gray-500 mt-1" />
        <span className="text-gray-500">{patient?.patient_name || t("breadcrumb.unknown_patient")}</span>
      </p>

      {/* Patient Details */}
      <div className="grid grid-cols-12 gap-4 my-4">
        <Suspense fallback={<div>{t("loading.patient_info")}</div>}>
          <PatientInfo1 patient={patient} t={t} />
          <PatientInfo2 patient={patient} refetchPatient={refetchPatient} t={t} />
        </Suspense>

        {/* Folders Section */}
        <div className="col-span-12 relative bg-[#fff] p-3 px-4 shadow-md rounded-lg">
          <Suspense fallback={<div>{t("loading.header")}</div>}>
            <FolderTableHeader
              view={view}
              setView={setView}
              id={id}
              search={search}
              setSearch={setSearch}
              refetchFolders={refetchFolders}
              t={t}
            />
          </Suspense>

          <div className="pt-4">
            {view === "list" ? (
              <Suspense fallback={<div>{t("loading.table")}</div>}>
                <Table>
                  <FolderTableHead t={t} />
                  <FolderTableBody
                    loading={loading}
                    folders={folders}
                    handleDelete={handleDelete}
                    isEditFolderOpen={isEditFolderOpen}
                    setIsEditFolderOpen={setIsEditFolderOpen}
                    refetchFolders={refetchFolders}
                    t={t}
                  />
                </Table>
              </Suspense>
            ) : (
              <Suspense fallback={<div>{t("loading.grid_view")}</div>}>
                <FolderGridTable
                  loading={loading}
                  folders={folders}
                  handleDelete={handleDelete}
                  isEditFolderOpen={isEditFolderOpen}
                  setIsEditFolderOpen={setIsEditFolderOpen}
                  refetchFolders={refetchFolders}
                  t={t}
                />
              </Suspense>
            )}

            <Suspense fallback={<div>{t("loading.footer")}</div>}>
              <FolderTableFooter
                perPage={perPage}
                setPerPage={setPerPage}
                page={page}
                setPage={setPage}
                pagination={pagination}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
