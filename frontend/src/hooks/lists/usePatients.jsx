import { useEffect, useState, useCallback } from "react";
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


    //memorize the function with callback to prevent recreate it when rerender

    const fetchPatients = useCallback(
        //use Debounce to prevent send api if data still change it wait 300 ms to send api request
        _.debounce(async (currentPage) => {
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
        }
            , 300), [perPage, search, gender, startDate, endDate, sortBy, sortDirection])


    useEffect(() => {
        fetchPatients(page);
    }, [page, fetchPatients]); //fetch new page if page change or one of the quires 

    useEffect(() => {
        setPage(1);
    }, [perPage, search, gender, sortBy, sortDirection, startDate, endDate]);

    //rest the page one if somthing change not page


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
