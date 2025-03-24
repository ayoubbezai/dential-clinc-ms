import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppointmentService } from '@/services/shared/AppointmentsService';
import _ from 'lodash';

const useAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("asc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceFetchAppointment = useMemo(() => {
        return _.debounce(async (page) => {
            setLoading(true);
            const { data, error } = await AppointmentService.getAppointments(
                perPage,
                search,
                status,
                startDate,
                endDate,
                sortBy,
                sortDirection,
                page
            );

            if (data?.success) {
                setAppointments(data.data);
                setPagination(data.pagination);
            } else {
                setError(error);
            }

            setLoading(false);

        }, 0);

    }, [page, perPage, search, status, sortBy, sortDirection, startDate, endDate])


    const fetchAppointments = useCallback((page) => {
        debounceFetchAppointment(page)
    }, [debounceFetchAppointment])
    useEffect(() => {
        fetchAppointments(page);
    }, [page, fetchAppointments]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search, status, sortBy, sortDirection, startDate, endDate]);

    return {
        appointments,
        pagination,
        page,
        setPage,
        search,
        setSearch,
        status,
        setStatus,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        perPage,
        setPerPage,
        loading,
        error,
        fetchAppointments,
    };
};

export default useAppointment;