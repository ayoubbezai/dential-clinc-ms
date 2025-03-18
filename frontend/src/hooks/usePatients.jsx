import { useEffect, useState } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';

const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("asc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPatients = async (page = 1) => {
        setLoading(true);
        const { data, error } = await PatientsService.getPatients(perPage, search, gender, startDate, endDate, sortBy, sortDirection, page);

        if (data?.success) {
            setPatients(data.data);
            setPagination(data.pagination);
            console.log(patients)
        } else {
            setError(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchPatients(page);
    }, [page, perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

    return {
        patients,
        pagination,
        page,
        setPage,
        search,
        setSearch,
        gender,
        setGender,
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
        error, fetchPatients
    };
};

export default usePatients;