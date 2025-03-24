import { useEffect, useState, useCallback, useMemo } from "react";
import { PatientsService } from "@/services/shared/PatientsService";
import _ from "lodash"; // Import Lodash for debouncing

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

    // Memoize the debounced function
    const debouncedFetchPatients = useMemo(() => {
        return _.debounce(async (currentPage) => {
            setLoading(true);
            try {
                const { data, error } = await PatientsService.getPatients(
                    perPage,
                    search,
                    gender,
                    startDate,
                    endDate,
                    sortBy,
                    sortDirection,
                    currentPage
                );

                if (data?.success) {
                    setPatients(data.data);
                    setPagination(data.pagination);
                } else {
                    setError(error);
                }
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }, 0); // 0ms debounce dont means it dont delay
    }, [perPage, search, gender, startDate, endDate, sortBy, sortDirection]);

    // Memoize the fetchPatients function
    const fetchPatients = useCallback((currentPage) => {
        debouncedFetchPatients(currentPage);
        
    }, [debouncedFetchPatients]);

    // Fetch patients when page or fetchPatients changes
    useEffect(() => {
        fetchPatients(page);
        
        
    }, [page, fetchPatients]);

    // Reset page to 1 when filters change
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
        error,
        fetchPatients,
    };
};

export default usePatients;