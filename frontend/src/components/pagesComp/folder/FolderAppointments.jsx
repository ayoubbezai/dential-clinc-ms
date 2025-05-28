import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import SearchInTable from "@/components/TableComp/SearchInTable";
import { selectClassName } from "@/constant/classNames";
import AppointmentsTable from "../appointments/AppointmentsTable";
import TableFooter from "@/components/TableComp/TableFooter";
import SortDirection from "@/components/TableComp/SortDirection";
import AddButton from "@/components/small/AddButton";

const FolderAppointments = ({
    folderId,
    folderAppointments,
    fetchFolderAppointments,
    loading,
    appsPagination,
    t
}) => {
    const [search, setSearch] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [statusFilter, setStatusFilter] = useState("");
    const [isAddAppOpen, setIsAddAppOpen] = useState(false);

    const [perPage, setPerPage] = useState();
    const [status, setStatus] = useState();
    const [sortBy] = useState();
    const [page, setPage] = useState();

    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef(null);
    const AddAppointmentModel = lazy(() => import("@/models/AddModels/AddAppointmnetModel"));

    const statusOptions = ["pending", "completed", "cancelled", "scheduled", "rescheduled"];

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
        setStatus(event.target.value);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            fetchFolderAppointments(folderId, perPage, search, status, sortBy, sortDirection, page);
        }
    }, [perPage, search, status, sortDirection, page]);

    return (
        <div
            ref={observerRef}
            className="col-span-12 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm"
        >
            <div className="flex items-center justify-between pb-2 px-2">
                <SearchInTable search={search} setSearch={setSearch} placeholder={t("folder_appointments.search_placeholder")} />

                <div className="flex items-center gap-3">
                    <select value={statusFilter} onChange={handleStatusChange} className={selectClassName}>
                        <option value="">{t("folder_appointments.status_filter_all")}</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {t(`folder_appointments.status_${status}`)}
                            </option>
                        ))}
                    </select>

                    <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} t={t} />

                    <AddButton onClick={() => setIsAddAppOpen(true)} label={t("folder_appointments.add_button")} />
                </div>
            </div>

            <AppointmentsTable
                appointments={folderAppointments}
                appointmentloading={loading}
                fetchAppointments={() => fetchFolderAppointments(folderId)}
                t={t}
            />

            <TableFooter
                perPage={perPage}
                setPerPage={setPerPage}
                page={appsPagination?.current_page || 1}
                setPage={setPage}
                pagination={appsPagination}
                t={t}
            />

            {isAddAppOpen && (
                <Suspense fallback={<div>{t("folder_appointments.loading")}</div>}>
                    <AddAppointmentModel
                        isOpen={isAddAppOpen}
                        onClose={() => setIsAddAppOpen(false)}
                        folder_id={folderId}
                        fetchFolderAppointments={fetchFolderAppointments}
                        t={t}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default FolderAppointments;
