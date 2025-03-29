import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import SearchInTable from "@/components/small/SearchInTable";
import { Button } from "@/components/designSystem/button";
import { FaPlus } from "react-icons/fa";
import { selectClassName } from "@/constant/classNames";
import AppointmentsTable from "../appointments/AppointmentsTable";
import TableFooter from "@/components/small/TableFooter";

const FolderAppointments = ({
    folderId,
    folderAppointments,
    fetchFolderAppointments,
    loading,
    setAppsPagination,
    appsPagination,
}) => {
    const [search, setSearch] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [statusFilter, setStatusFilter] = useState("");
    const [isAddAppOpen, setIsAddAppOpen] = useState(false);

    // Pagination & Sorting States
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

    const handleSortChange = (event) => {
        setSortDirection(event.target.value);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            console.log("Fetching appointments...");
            fetchFolderAppointments(folderId, perPage, search, status, sortBy, sortDirection, page);
        }
    }, [perPage, search, status, sortDirection, page]);

    return (
        <div ref={observerRef} className="col-span-12 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
            <div className="flex items-center justify-between pb-2 px-2">
                <SearchInTable search={search} setSearch={setSearch} />
                <div className="flex items-center gap-3">
                    <select value={statusFilter} onChange={handleStatusChange} className={selectClassName}>
                        <option value="">All</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select value={sortDirection} onChange={handleSortChange} className={selectClassName}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <Button size={"sm"} className="bg-blue-600 text-white mx-2 rounded-lg" onClick={() => setIsAddAppOpen(true)}>
                        <FaPlus size={12} />
                    </Button>
                </div>
            </div>

                <AppointmentsTable
                    appointments={folderAppointments}
                    appointmentloading={loading}
                    fetchAppointments={() => fetchFolderAppointments(folderId)}
                />

            <TableFooter perPage={perPage} setPerPage={setPerPage} page={appsPagination?.current_page || 1} setPage={setPage} pagination={appsPagination} />

            {isAddAppOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <AddAppointmentModel isOpen={isAddAppOpen} onClose={() => setIsAddAppOpen(false)} folder_id={folderId} fetchFolderAppointments={fetchFolderAppointments} />
                </Suspense>
            )}
        </div>
    );
};

export default FolderAppointments;
